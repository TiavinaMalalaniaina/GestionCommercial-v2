using System.IO;
using Aspose.Pdf;
using Aspose.Pdf.Annotations;
using Aspose.Pdf.Text;
using sales_departements.Context;
namespace sales_departements.Models.pdf;

public class ExportPdf {

        
        public void CreatePdf(string filePath, string content)
        {
            Document document = new Document();
            Page page = document.Pages.Add();

            TextFragment textFragment = new TextFragment(content);

            // Ajouter des styles au texte (par exemple, la police, la taille de police, la couleur, etc.)
            textFragment.TextState.Font = FontRepository.FindFont("Arial");
            textFragment.TextState.FontSize = 12;
            textFragment.TextState.ForegroundColor = Color.Green;

            page.Paragraphs.Add(textFragment);
            document.Save(filePath);
        }
        public void AddTitre(string supplierName, string filePath, Document document, Page page) {
            string proforma = supplierName;
           
            TextFragment titre1 = new TextFragment(proforma);
            titre1.Position = new Position(50, 780);
            titre1.TextState.FontSize = 20;
            titre1.TextState.ForegroundColor = Aspose.Pdf.Color.FromRgb(System.Drawing.Color.Gray);
            titre1.TextState.FontStyle = FontStyles.Bold;

            page.Paragraphs.Add(titre1);
            document.Save(filePath);

        }

        public void Text(string filePath, Document document, Page page, string supplierName, string productsServices, string productDetails)
        {
            // Additional text for proforma request
            string proformaRequestText = $"Objet : Demande de Proforma\n\nCher {supplierName},\n\nJ'espère que ce message vous trouve bien. Nous sommes actuellement en train de planifier notre prochaine commande de {productsServices} pour notre entreprise, et nous sommes intéressés par vos produits/services exceptionnels.\n\nAfin de finaliser notre budget et de garantir une exécution en douceur de notre commande, nous aimerions vous demander de bien vouloir nous fournir un proforma détaillé pour les éléments suivants :\n\n{productDetails}\n\nNous vous prions également de spécifier toutes les remises ou conditions particulières que nous devrions prendre en compte.\n\nVotre coopération rapide dans cette demande serait grandement appréciée, car cela nous aidera à prendre des décisions informées et à maintenir notre calendrier de commande.\n\nN'hésitez pas à nous contacter si vous avez besoin de plus d'informations de notre part. Nous sommes impatients de recevoir votre proforma et d'établir une collaboration continue fructueuse.\n\nCordialement,\n[Mr Benjamina]\n[PDG]\n[BETIAM]\n[0349867712]";

            TextFragment titre1 = new TextFragment(proformaRequestText);
            titre1.Position = new Position(50, 660);
            titre1.TextState.FontSize = 12; // Adjust the font size as needed
            titre1.TextState.ForegroundColor = Aspose.Pdf.Color.FromRgb(System.Drawing.Color.Black);
            titre1.TextState.FontStyle = FontStyles.Regular; // Adjust the font style as needed

            page.Paragraphs.Add(titre1);
            document.Save(filePath);
        }

       
        public void AddCompanyInformation(SalesDepartementsContext context, Supplier supplier, string filePath, Document document, Page page) {
            

            AddTitre(supplier.Name, filePath, document, page);
            string adresse = supplier.Address;
            string telephone = supplier.ContactPhone;
            string email = supplier.ContactEmail;

            TextFragment adresseTF = new TextFragment(adresse);
            TextFragment telephoneTF = new TextFragment(telephone);
            TextFragment emailTF = new TextFragment(email);

            adresseTF.Position = new Position(50, 740);adresseTF.TextState.FontSize = 12;
            telephoneTF.Position = new Position(50, 720);telephoneTF.TextState.FontSize = 12;
            emailTF.Position = new Position(50, 700);emailTF.TextState.FontSize = 12;

            page.Paragraphs.Add(adresseTF);page.Paragraphs.Add(telephoneTF);page.Paragraphs.Add(emailTF);

            document.Save(filePath);

        }

        public void CreateTable(string filePath, Document document, Page page, List<RequestDetail> requestDetails) {
            Table table = new Table();

            table.Border = new BorderInfo(BorderSide.All, .5f, Color.FromRgb(System.Drawing.Color.LightGray));
            table.Margin.Left = -30;
            table.Margin.Top = 440;
            table.ColumnWidths = "160";
            table.DefaultCellBorder = new BorderInfo(BorderSide.All, .5f, Color.FromRgb(System.Drawing.Color.LightGray));
            Row headerRow = table.Rows.Add();
         
            AddCellHeader(headerRow, "No", HorizontalAlignment.Center, Aspose.Pdf.Color.Gray); 
            AddCellHeader(headerRow, "Designation", HorizontalAlignment.Center, Aspose.Pdf.Color.Gray);
            AddCellHeader(headerRow, "Quantite", HorizontalAlignment.Center, Aspose.Pdf.Color.Gray);
            headerRow.MinRowHeight = 35;

            for(int i=0; i< requestDetails.Count; i++)
            {
                Row row = table.Rows.Add();
                AddCell(row, (i+1).ToString(), HorizontalAlignment.Center, Aspose.Pdf.Color.Empty);
                AddCell(row, requestDetails[i].Product.ProductName, HorizontalAlignment.Center, Aspose.Pdf.Color.Empty);
                AddCell(row, requestDetails[i].Quantity.ToString(), HorizontalAlignment.Center, Aspose.Pdf.Color.Empty);


                row.MinRowHeight = 35;
            }

            document.Pages[1].Paragraphs.Add(table);
            document.Save(filePath);

        }

        // Méthode utilitaire pour ajouter une cellule avec texte centré et couleur d'arrière-plan
        private void AddCell(Row row, string text, HorizontalAlignment  alignment, Aspose.Pdf.Color backgroundColor)
        {
            Cell cell = row.Cells.Add(text);
            cell.Alignment = alignment;
            cell.BackgroundColor = backgroundColor;
        } 
         private void AddCellHeader(Row row, string text, HorizontalAlignment alignment, Aspose.Pdf.Color backgroundColor)
        {
            Cell cell = row.Cells.Add(text);
            cell.Alignment = alignment;
            cell.BackgroundColor = backgroundColor;
        }


        
    }