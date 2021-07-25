using Common.DTO;
using Common.Model;
using Common.Repo;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Logic
{
    public class ContainerLogic: IContainerLogic
    {
        ContainerRepo repo = new ContainerRepo();

        public int? Add(Container container)
        {
            return repo.Add(container);
        }

        public int Update(Container container)
        {
            return repo.Update(container);
        }

        private void validate(Container container)
        {
            // Could have used mvc validation model as well
            // Let us assume we have a serius business logic to validate here
            if (container.ColourId == 0)
            {
                throw new Exception("colour can not be empty");
            }

            if (container.TypeId == 0)
            {
                throw new Exception("container type can not be empty");
            }

            if (string.IsNullOrWhiteSpace(container.Name))
            {
                throw new Exception("container  name is not valid");
            }

        }

        public int? Delete(int Id)
        {
            return repo.Delete(Id);
        }

        public   List<ContainerDTO> GetAll(int limit)
        {

            return repo.GetAll(limit);
        }

        public List<ContainerDTO> Search(string search)
        {
          return  repo.Search(search); ;
        }

        public LookupDTO GetLookupData()
        {
            return repo.Lookup();
        }
    }
}
