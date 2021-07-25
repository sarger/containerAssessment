using Common.Logic;
using Common.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace colourApp.Controllers
{
    public class ColourController : Controller
    {
        readonly IColourLogic colourlogic = new ColourLogic();
        public ActionResult Index()
        {
            return View();
        }
         


        [HttpPost]
        public string Add(Colour colour)
        {
            try
            {
                return JsonConvert.SerializeObject(colourlogic.Add(colour));
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }

        [HttpPost]
        public string Update(Colour colour)
        {
            try
            {
                return JsonConvert.SerializeObject(colourlogic.Update(colour));
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
                return JsonConvert.SerializeObject(colourlogic.GetAll());
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
                return JsonConvert.SerializeObject(colourlogic.Search(find));
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return ex.ToString();
            }
        }

    }
}