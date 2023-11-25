namespace sales_departements.Models;

public class ProductQuantityByMonth
{
    public Product Product { get; set; }
    public double Quantity { get; set; }
    public string Month { get; set; }

    public ProductQuantityByMonth(Product product, double quantity, string month) {
        Product = product;
        Quantity = quantity;
        Month = month;
    }


}