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
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users
{
    [ResourceBasedAuthorize(AuthorizationResources.CreateUser)]
    public class CreateUser : PrgPageModel<CreateUser.Model>
    {
        private readonly IMediator _mediator;
        private readonly IRoleQueries _roleQueries;

        public CreateUser(IMediator mediator, IRoleQueries roleQueries)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._roleQueries = roleQueries ?? throw new ArgumentNullException(nameof(roleQueries));
        }

        

        

        public List<SelectListItem> AvailableRoles { get; set; }

        public async Task OnGet()
        {
            this.AvailableRoles = new List<SelectListItem>();
            var roles = await this._roleQueries.GetSimpleRoles(cancellationToken: CancellationToken.None);
            if (roles.HasValue)
            {
                this.AvailableRoles.AddRange(roles.Value.Entities.Select(x => new SelectListItem(x.Name, x.Id.ToString())));
            }
            
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new CreateUserCommand(this.PageModel.EmailAddress,
                this.PageModel.IsLockable, this.PageModel.IsAdmin, this.PageModel.Roles));

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
            public string EmailAddress { get; set; }
            public bool IsLockable { get; set; }

            public bool IsAdmin { get; set; }

            public List<Guid> Roles { get; set; }

            public string FirstName { get; set; }

            public string LastName { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
            public Validator()
            {
                this.RuleFor(x => x.EmailAddress).NotEmpty();
            }
        }
    }
}
