// TOKEN_COPYRIGHT_TEXT

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users
{
    public abstract class NotificationPageModel : PageModel
    {
        private const string Key = "NotificationPageModel";
        private readonly List<PageNotification> _pageNotifications;

        protected NotificationPageModel()
        {
            this._pageNotifications = new List<PageNotification>();
        }

        [ViewData(Key = nameof(PageNotifications))]
        public IReadOnlyList<PageNotification> PageNotifications => this._pageNotifications.AsReadOnly();

        public override void OnPageHandlerExecuting(PageHandlerExecutingContext context)
        {
            base.OnPageHandlerExecuting(context);
            if (!(context.Result is RedirectToPageResult))
            {
                if (this.TempData[$"{Key}PageNotifications"] is string serializedPageNotifications)
                {
                    if (context.Result == null)
                    {
                        var notifications =
                            JsonConvert.DeserializeObject<List<PageNotification>>(serializedPageNotifications);
                        this._pageNotifications.AddRange(notifications);
                    }
                    else
                    {
                        this.TempData.Remove($"{Key}PageNotifications");
                    }
                }
            }
        }

        public override void OnPageHandlerExecuted(PageHandlerExecutedContext context)
        {
            base.OnPageHandlerExecuted(context);
            if (context.Result is RedirectToPageResult)
            {
                var pageNotifications = JsonConvert.SerializeObject(this._pageNotifications);
                this.TempData[$"{Key}PageNotifications"] = pageNotifications;
            }
        }

        protected void AddPageNotification(string title, string message)
        {
            this._pageNotifications.Add(new PageNotification(title, message));
        }

        public class PageNotification
        {
            public PageNotification()
            {
            }

            public PageNotification(string title, string message)
            {
                this.Title = title;
                this.Message = message;
            }

            public string Title { get; set; }

            public string Message { get; set; }
        }
    }
}