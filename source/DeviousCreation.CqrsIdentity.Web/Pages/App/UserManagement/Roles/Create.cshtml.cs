using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;


namespace DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Roles
{
    public class Create : PageModel
    {
        private readonly IMediator _mediator;

        public Create(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [BindProperty]
        public Model PageModel { get; set; }

        [TempData]
        public PrgState PrgState { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new CreateRoleCommand(PageModel.Name, PageModel.Roles));

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
            public Model()
            {
                this.Roles = new List<Guid>();
            }

            public string Name { get; set; }

            public List<Guid> Roles { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
            public Validator()
            {
                this.RuleFor(x => x.Name).NotEmpty();
            }
        }
    }
}
