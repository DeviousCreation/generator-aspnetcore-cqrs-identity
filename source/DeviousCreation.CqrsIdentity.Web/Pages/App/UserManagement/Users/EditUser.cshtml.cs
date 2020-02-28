using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Attributes;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users
{
    [ResourceBasedAuthorize(AuthorizationResources.EditUser)]
    public class EditUser : PrgPageModel<EditUser.Model>
    {
        private readonly IRoleQueries _roleQueries;
        private readonly IUserQueries _userQueries;
        private readonly IMediator _mediator;

        [BindProperty(SupportsGet = true)]
        public Guid Id { get; set; }

        public EditUser(IRoleQueries roleQueries, IUserQueries userQueries, IMediator mediator)
        {
            this._roleQueries = roleQueries;
            this._userQueries = userQueries;
            this._mediator = mediator;
        }

        public async Task<IActionResult> OnGetAsync()
        {
            if (PageModel == null)
            {
                var userDetails = await this._userQueries.GetUserDetailsForEditUserId(Id, CancellationToken.None);
                if (userDetails.HasNoValue)
                {
                    return this.NotFound();
                }

                PageModel = new Model
                {
                    EmailAddress = userDetails.Value.EmailAddress,
                    Username = userDetails.Value.Username,
                    FirstName = userDetails.Value.FirstName,
                    LastName = userDetails.Value.LastName,
                    IsLockable = userDetails.Value.IsLockable,
                    IsAdmin = userDetails.Value.IsAdmin,
                    Roles = userDetails.Value.Roles.ToList(),
                    UserId = Id,
                };
            }

            this.AvailableRoles = new List<SelectListItem>();
            var roles = await this._roleQueries.GetSimpleRoles(cancellationToken: CancellationToken.None);
            if (roles.HasValue)
            {
                this.AvailableRoles.AddRange(roles.Value.Entities.Select(x => new SelectListItem(x.Name, x.Id.ToString())));
            }

            return this.Page();


        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new UpdateUserDetailsCommand(
                PageModel.UserId,
                PageModel.FirstName,
                PageModel.LastName,
                PageModel.EmailAddress,
                PageModel.IsAdmin,
                PageModel.IsLockable,
                PageModel.Roles
                ));

            if (result.IsSuccess)
            {
                PrgState = PrgState.Success;
            }
            else
            {
                PrgState = PrgState.Failed;
            }
            return this.RedirectToPage();
        }

        public class Model
        {
            public string Username { get; set; }

            public string EmailAddress { get; set; }

            public bool IsLockable { get; set; }

            public bool IsAdmin { get; set; }

            public List<Guid> Roles { get; set; }

            public Guid UserId { get; set; }

            public string FirstName { get; set; }

            public string LastName { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {

        }

        public List<SelectListItem> AvailableRoles { get; set; }
    }
}
