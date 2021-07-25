using Common.DTO;
using Common.Model;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Common.Repo
{
    public  class BaseRepo<T> 
    {
        public int? Add(T obj)
        {
            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {
                return conn.Insert(obj);
            }
        }

        public  int Update(T obj)
        {

            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {
                return conn.Update(obj);
            }
        }



  


    }
}
