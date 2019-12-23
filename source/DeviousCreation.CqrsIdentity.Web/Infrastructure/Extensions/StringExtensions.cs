using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.Extensions
{
    public static class StringExtensions
    {
        public static ModelStateDictionary DeserializeModelState(this string serializedModelState)
        {
            var errorList = JsonConvert.DeserializeObject<List<ModelStateTransferContainer>>(serializedModelState);
            var modelState = new ModelStateDictionary();

            foreach (var item in errorList)
            {
                modelState.SetModelValue(item.Key, item.RawValue, item.AttemptedValue);
                foreach (var error in item.ErrorMessages)
                {
                    modelState.AddModelError(item.Key, error);
                }
            }

            return modelState;
        }
    }
}