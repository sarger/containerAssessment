using Common.Model;
using System;
using System.Collections.Generic;
using System.Text;
using Type = Common.Model.Type;

namespace Common.DTO
{
  public  class LookupDTO
  {
         public List<Colour> Colours { get; set; }
         public List<Type> Types { get; set; }
    }
}
