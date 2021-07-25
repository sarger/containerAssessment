using Common.DTO;
using Common.Model;
using Common.Repo;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Logic
{
    public interface IColourLogic
    {

        int? Add(Colour container);
        int Update(Colour container);
        List<Colour> GetAll();
        List<Colour> Search(string search);


    }
}
