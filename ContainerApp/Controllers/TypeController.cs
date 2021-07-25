using Common.Logic;
using Common.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Type = Common.Model.Type;

namespace typeApp.Controllers
{
    public class TypeController : Controller
    {
        ITypeLogic typelogic = new TypeLogic();
        public ActionResult Index()
        {
            return View();
        }

  


        [HttpPost]
        public string Add(Type type)
        {
            try
            {
                return JsonConvert.SerializeObject(typelogic.Add(type));
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }

        [HttpPost]
        public string Update(Type type)
        {
            try
            {
                return JsonConvert.SerializeObject(typelogic.Update(type));
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }

        [HttpGet]
        public string GetAll()
        {
            try
            {
                return JsonConvert.SerializeObject(typelogic.GetAll());
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }

        [HttpGet]
        public string Search(string find)
        {
            try
            {
                return JsonConvert.SerializeObject(typelogic.Search(find));
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }

    }
}