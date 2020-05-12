using System;
using System.Collections.Generic;

namespace Onboarding_task_MVC.Models
{
    public partial class Products
    {
        public Products()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
