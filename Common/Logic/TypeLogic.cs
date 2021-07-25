using Common.DTO;
using Common.Model;
using Common.Repo;
using System;
using System.Collections.Generic;
using System.Text;
using Type = Common.Model.Type;

namespace Common.Logic
{
    public class TypeLogic : ITypeLogic
    {
        TypeRepo repo = new TypeRepo();

        public int? Add(Type type)
        {
            return repo.Add(type);
        }

        public int Update(Type type)
        {
            return repo.Update(type);
        }

        private void validate(Type type)
        {
            // Could have used mvc validation model as well
            // Let us assume we have a serius business logic to validate here
          

            if (string.IsNullOrWhiteSpace(type.Name))
            {
                throw new Exception("type  name is not valid");
            }

        }

        public List<Type> GetAll()
        {
            return repo.GetAll();
        }

        public List<Type> Search(string find)
        {
           return repo.Search(find);
        }
    }
}
