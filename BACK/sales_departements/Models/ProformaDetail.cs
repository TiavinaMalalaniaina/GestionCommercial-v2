using System;
using System.Collections.Generic;
using sales_departements.Context;

namespace sales_departements.Models;

public partial class ProformaDetail
{
    public string ProformaDetailsId { get; set; } = null!;

    public string? ProformaId { get; set; }

    public string? ProductId { get; set; }

    public int? Quantity { get; set; }

    public decimal? Price { get; set; }

    public virtual Product? Product { get; set; }

    // public virtual Proforma? Proforma { get; set; }

    public override string ToString() {
        return $"ProformaId:{ProformaId}";
    }

    public void Create(SalesDepartementsContext context) {
        context.ProformaDetails.Add(this);
    }

    public void Creates(SalesDepartementsContext context, List<ProformaDetail> proformaDetails, string proformaId) {
        foreach (ProformaDetail proformaDetail in proformaDetails)
        {
            proformaDetail.ProformaId = proformaId;
            proformaDetail.Create(context);
        }
    }

    public List<ProformaDetail> GetProformaDetailsByProformaId(SalesDepartementsContext context, string proformaId) {
        List<ProformaDetail> p = context.ProformaDetails
            .Where(p => p.ProformaId == proformaId)
            .ToList();
        foreach (ProformaDetail item in p)
        {
            item.Product = context.Products.Where(p => p.ProductId == item.ProductId).FirstOrDefault();
        }
        return p;
    }
    
    public bool IsAlreadyTaken(List<Product> products)
    {
        foreach (var product in products)
        {
            if (product.ProductId.Equals(ProductId))
            {
                return true;
            }
        }

        return false;
    }
    public bool IsAlreadyTakenProforma(List<Proforma> proformas)
    {
        foreach (var proforma in proformas)
        {
            if (proforma.ProformaId.Equals(ProformaId))
            {
                return true;
            }
        }

        return false;
    }
    public List<Product> GetListProductsAtProformaDetails(SalesDepartementsContext context)
    {
        List<Product> products = new List<Product>();
        List<ProformaDetail> proformaDetails = context.ProformaDetails.ToList();
        foreach (var proformaDetail in proformaDetails)
        {
            if (!proformaDetail.IsAlreadyTaken(products))
            {
                Product product = new Product().GetProduct(context, proformaDetail.ProductId);
                products.Add(product);
            }
        }

        return products;
    }
    
    public List<Proforma> GetListProformaAtProformaDetails(SalesDepartementsContext context, List<string> proformaDetailsArg)
    {
        List<Proforma> proformas = new List<Proforma>();
        List<ProformaDetail> proformaDetails = GetProformaDetailsByProformaDetailsId(context, proformaDetailsArg);
        foreach (var proformaDetail in proformaDetails)
        {
            if (!proformaDetail.IsAlreadyTakenProforma(proformas))
            {
                Proforma proforma = new Proforma().GetProforma(context, proformaDetail.ProformaId);
                proformas.Add(proforma);
            }
        }

        return proformas;
    }

    public List<ProformaDetail> GetProformaDetailsByProformaDetailsId(SalesDepartementsContext context,
        List<string> proformaDetailsId)
    {
        List<ProformaDetail> proformaDetails = new List<ProformaDetail>();
        foreach (var prf in proformaDetailsId)
        {
            ProformaDetail proformaDetail = context.ProformaDetails.Find(prf);
            proformaDetails.Add(proformaDetail);
        }

        return proformaDetails;
    }
    
}
