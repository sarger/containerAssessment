using Common.DTO;
using Common.Model;
using Common.Repo;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Logic
{
    public interface IContainerLogic
    {


        int? Add(Container container);
        int Update(Container container);
        int? Delete(int Id);
        List<ContainerDTO> GetAll(int limit);
        List<ContainerDTO> Search(string search);
        LookupDTO GetLookupData();

    }
}
