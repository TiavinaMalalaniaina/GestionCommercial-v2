using sales_departements.Context;
namespace sales_departements.Models;

public partial class VRequestCurve
{
    public string? DepartmentId { get; set; }
    public string? ProductId { get; set; }
    public string? DepartmentName { get; set; }
    public string? ProductName { get; set; }
    public string? Month { get; set; }
    public int TotalQuantity { get; set; }

    public List<string> GetDepartmentsId(List<VRequestCurve> vRequestCurves) {
        List<string> departmentsId = new ();
        foreach (VRequestCurve vRequestCurve in vRequestCurves)
        {
            List<object> objects = new (departmentsId);
            if(!IsAtList(objects, vRequestCurve.DepartmentId)) {
                departmentsId.Add(vRequestCurve.DepartmentId);
            }
        }
        return departmentsId;
    }

    public List<RequestCurve> GetVRequestCurvesWithDepartments(SalesDepartementsContext context, List<VRequestCurve> vRequestCurves) {
        List<RequestCurve> requestCurves = new ();
        List<string> departmentsId = GetDepartmentsId(vRequestCurves);
        foreach (string departmentId in departmentsId)
        {
            List<ProductQuantityByMonth> productQuantityByMonths = new ();
            foreach (VRequestCurve vRequestCurve in vRequestCurves)
            {
                if (departmentId.Equals(vRequestCurve.DepartmentId)) {
                    Product product = new Product().GetProduct(context, vRequestCurve.ProductId);
                    productQuantityByMonths.Add(new ProductQuantityByMonth(product, vRequestCurve.TotalQuantity, vRequestCurve.Month));
                }
            }
            if (productQuantityByMonths.Count > 0)
            {
                Department department = new Department().GetDepartment(context, departmentId);
                requestCurves.Add(new RequestCurve(department, productQuantityByMonths));
            }

        }
        return requestCurves;
    }

    public bool IsAtList(List<object> objects, object objA) {
        foreach (object obj in objects)
        {
            if(obj.Equals(objA)) return true;
        }
        return false;
    }
}