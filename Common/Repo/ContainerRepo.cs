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
    public  class ContainerRepo: BaseRepo<Container>
    {

        internal int Delete(int id)
        {

            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {
             return conn.Delete<Container>(id);
            }
        }

        internal List<ContainerDTO> GetAll(int limit)
        {
            // this can be a stoc proc as well
            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {
                var sql = $@"select top({ limit}) c.*, cl.Name as Colour, tp.Name as Type from [Container] c" +
                          $"  left join Colour cl on cl.Id = c.ColourId" +
                          $"  left join Type tp on tp.Id = c.TypeId " +
                          $"order by c.Id desc";
                return conn.Query<ContainerDTO>(sql, new { limit }, commandType: CommandType.Text).ToList();
            }

        }

        internal List<ContainerDTO> Search(string searchword)
        {
            // this can be a stoc proc as well
            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {

                string condition = "";
                if (int.TryParse("123", out _)) 
                {
                     condition = $@" or c.Id like '%{searchword}%' ";
                }

                var sql = $"select c.*, cl.Name as Colour, tp.Name as Type   " 
                          + $"  from [Container] c                           "
                          + $"   left join Colour cl on cl.Id = c.ColourId   "
                          + $"   left join Type tp on tp.Id = c.TypeId       "
                          + $"   where    c.Name  like '%{searchword}%'  or  "
                          + $"            cl.Name like '%{searchword}%'  or  "
                          + $"            tp.Name like '%{searchword}%'      "
                          + $"  { condition }";
                
                return conn.Query<ContainerDTO>(sql, new {  }, commandType: CommandType.Text).ToList();
            }

        }

        internal LookupDTO Lookup()
        {

            using (var conn = new System.Data.SqlClient.SqlConnection(Helpers.Database.ConnectionString))
            {
                var sql = $"select * from [Colour];select * from [Type]";
              
                using (var multi = conn.QueryMultiple(sql, new {   }))
                {
                    LookupDTO lookup = new LookupDTO();
                    lookup.Colours = multi.Read<Colour>().ToList();
                    lookup.Types = multi.Read<Common.Model.Type>().ToList();
                    return lookup;
                }

            }



        }


    }
}
