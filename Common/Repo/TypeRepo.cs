using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Common.Repo
{
   public  class TypeRepo: BaseRepo<Model.Type>
   {

        internal List<Model.Type> GetAll()
        {
            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {

                return conn.GetList<Model.Type>().OrderBy(x => x.Name).ToList();
            
            }
        }

        internal List<Model.Type> Search(string find)
        {
            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {

                return conn.GetList<Model.Type>($"where Name like '%{ find}%'").OrderBy(x => x.Name).ToList();
            }
        }
    }
}
