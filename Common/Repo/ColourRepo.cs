using Common.Model;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Common.Repo
{
    public  class ColourRepo: BaseRepo<Colour>
    {

        internal List<Colour> GetAll() 
        {

            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {

                return conn.GetList<Colour>().OrderBy(x => x.Name).ToList();
            }           
          }

        internal List<Colour> Search(string search)
        {
            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {

                return conn.GetList<Colour>($"where Name like '%{ search}%'").OrderBy(x => x.Name).ToList();
            }
        }
    }
}

