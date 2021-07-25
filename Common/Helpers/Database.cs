using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;

namespace Common.Helpers
{
    class Database
    {      
        public static string ConnectionString = ConfigurationManager.ConnectionStrings["Container"].ConnectionString;
      
    }
}
