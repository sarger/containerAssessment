using Common.DTO;
using Common.Model;
using Common.Repo;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Logic
{
    public class ColourLogic: IColourLogic
    {
        ColourRepo repo = new ColourRepo();

        public int? Add(Colour container)
        {
            return repo.Add(container);
        }

        public int Update(Colour container)
        {
            return repo.Update(container);
        }

        private void validate(Colour container)
        {
            // Could have used mvc validation model as well
            // Let us assume we have a serius business logic to validate here
       
            if (string.IsNullOrWhiteSpace(container.Name))
            {
                throw new Exception("container  name is not valid");
            }

        }

        public   List<Colour> GetAll()
        {

            return repo.GetAll();
        }

        public List<Colour> Search(string search)
        {
            return repo.Search(search);
        }

 
    }
}
