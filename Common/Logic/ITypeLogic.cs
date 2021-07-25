using Common.DTO;
using Common.Model;
using Common.Repo;
using System;
using System.Collections.Generic;
using System.Text;
using Type = Common.Model.Type;

namespace Common.Logic
{
    public interface ITypeLogic
    {

         int? Add(Type type);
         int Update(Type type);
         List<Type> GetAll();
        List<Type> Search(string find);
    }
}
