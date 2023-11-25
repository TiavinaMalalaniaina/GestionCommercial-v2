namespace sales_departements.Models;

public class RequestCurve
{
    public Department Department;
    public List<ProductQuantityByMonth> ProductQuantityByMonths;

    public RequestCurve(Department department,  List<ProductQuantityByMonth> productQuantityByMonths) {
        Department = department;
        ProductQuantityByMonths = productQuantityByMonths;
    }

    public RequestCurve() {

    }
}