using Common.Logic;
using Common.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ContainerApp.Controllers
{
    public class ContainerController : Controller
    {
        readonly IContainerLogic containerlogic = new ContainerLogic();
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string Delete(int Id)
        {
            try
            {
                return JsonConvert.SerializeObject(containerlogic.Delete(Id));

            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }



        [HttpPost]
        public string Add(Container container)
        {
            try
            {
                return JsonConvert.SerializeObject(containerlogic.Add(container));
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }

        [HttpPost]
        public string Update(Container container)
        {
            try
            {
                return JsonConvert.SerializeObject(containerlogic.Update(container));
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }

        [HttpGet]
        public string GetAll(int limit = 10)
        {
            try
            {
                return JsonConvert.SerializeObject(containerlogic.GetAll(limit));
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
                return JsonConvert.SerializeObject(containerlogic.Search(find));
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }
        

        public string GetLookupData()
        {
            try
            {
                return JsonConvert.SerializeObject(containerlogic.GetLookupData());
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }


    }
}