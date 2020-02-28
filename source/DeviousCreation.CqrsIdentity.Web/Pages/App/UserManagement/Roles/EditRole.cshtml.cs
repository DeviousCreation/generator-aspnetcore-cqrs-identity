using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Queries.Models;
using DeviousCreation.CqrsIdentity.Queries.Models.Role;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users;
using MaybeMonad;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Roles
{
    public class EditRole : PrgPageModel<EditRole.Model>
    {
        private readonly IRoleQueries _roleQueries;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMediator _mediator;

        public EditRole(IRoleQueries roleQueries, ICurrentUserService currentUserService, IMediator mediator)
        {
            this._roleQueries = roleQueries;
            this._currentUserService = currentUserService;
            this._mediator = mediator;
        }

        [BindProperty(SupportsGet = true)]
        public Guid Id { get; set; }

        public async Task<IActionResult> OnGet()
        {

            if (PageModel == null)
            {
                var roleDetails = await this._roleQueries.GetRoleDetailsForRoleByRoleId(Id, CancellationToken.None);
                if (roleDetails.HasNoValue)
                {
                    return this.NotFound();
                }

                PageModel = new Model
                {
                    Name = roleDetails.Value.Name,
                    RoleId = roleDetails.Value.Id,
                    Resources = roleDetails.Value.Resources.ToList(),
                };
            }

            return this.Page();
        }

        public async Task<IActionResult> OnPost()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            if (this._currentUserService.CurrentUser.HasNoValue)
            {
                return this.Unauthorized();
            }

            // LOAD ROLE DETAILS TO GET THE RESOURCES THE ROLE STARTED WITH
            var roleDetailsMaybe = await this._roleQueries.GetRoleDetailsForRoleByRoleId(this.PageModel.RoleId, CancellationToken.None);
            if (roleDetailsMaybe.HasNoValue)
            {
                this.PrgState = PrgState.InError;
                return this.RedirectToPage();
            }

            var currentResources = roleDetailsMaybe.Value.Resources;
            
            // LOAD RESOURCES THE USER HAS ACCESS TOO
            Maybe<ListResult<SimpleResource>> resourcesMaybe;
            if (this._currentUserService.CurrentUser.Value.IsAdmin)
            {
                resourcesMaybe = await this._roleQueries.GetSimpleResources(CancellationToken.None);
            }
            else
            {
                resourcesMaybe = await this._roleQueries.GetSimpleResourcesAvailableForUser(
                    this._currentUserService.CurrentUser.Value.UserId, CancellationToken.None);
            }

            if (resourcesMaybe.HasNoValue)
            {
                this.PrgState = PrgState.InError;
                return this.RedirectToPage();
            }

            var availableResources = resourcesMaybe.Value.Entities.Select(x=>x.Id).ToList();

            var resourcesToSave = currentResources.Except(availableResources).ToList();

            resourcesToSave.AddRange(PageModel.Resources);


            var result = await this._mediator.Send(new UpdateRoleCommand(PageModel.RoleId, PageModel.Name, resourcesToSave));

            if (result.IsSuccess)
            {
                this.AddPageNotification("Edit Successful", "Your changed has been saved");
                return this.RedirectToPage("/App/UserManagement/Roles/Index");
            }
            else
            {
                PrgState = PrgState.Failed;
            }
            return this.RedirectToPage();
        }

        public class Model
        {
            public Model()
            {
                this.Resources = new List<Guid>();
            }

            public string Name { get; set; }

            public List<Guid> Resources { get; set; }

            public Guid RoleId { get; set; }
        }
    }
}
