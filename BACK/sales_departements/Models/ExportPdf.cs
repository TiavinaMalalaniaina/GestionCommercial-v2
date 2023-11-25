using System.IO;
using Aspose.Pdf;
using Aspose.Pdf.Text;

namespace sales_departements.Models
{
    public class ExportPdf
    {
        public void CreatePdf(string filePath, string content)
        {
            Document document = new Document();
            document.Pages.Add();

            TextFragment textFragment = new TextFragment(content);

            // // Ajouter des styles au texte (par exemple, la police, la taille de police, la couleur, etc.)
            textFragment.TextState.Font = FontRepository.FindFont("Arial");
            textFragment.TextState.FontSize = 12;
            textFragment.TextState.ForegroundColor = Color.Green;

            document.Save(filePath);
        }

        public void CreatePdfWithTable(string filePath)
        {
            // Charger le document PDF source
            Document doc = new Document(filePath);

            // Initialise une nouvelle instance de la Table
            Table table = new Table();

            // Définissez la couleur de la bordure du tableau sur LightGray
            table.Border = new BorderInfo(BorderSide.All, .5f, Color.FromRgb(System.Drawing.Color.LightGray));

            // Définir la bordure des cellules du tableau
            table.DefaultCellBorder = new BorderInfo(BorderSide.All, .5f, Color.FromRgb(System.Drawing.Color.LightGray));


            Row headerRow = table.Rows.Add();
            headerRow.Cells.Add("Designation");
            headerRow.Cells.Add("Quantite");
            headerRow.Cells.Add("Prix unitaire (HT)");
            headerRow.Cells.Add("TVA");
            headerRow.Cells.Add("Prix TTC");
            headerRow.MinRowHeight = 35;

            // Ajouter des lignes avec des hauteurs personnalisées
            for(int i=0; i<10; i++)
            {
                Row row = table.Rows.Add();
                row.Cells.Add("");
                row.Cells.Add("");
                row.Cells.Add("");
                row.Cells.Add("");
                row.Cells.Add("");

                row.MinRowHeight = 35;
            }


            // Ajouter un objet tableau à la première page du document d'entrée
            doc.Pages[1].Paragraphs.Add(table);

            // Enregistrer le document mis à jour contenant l'objet tableau
            doc.Save(filePath);
        }

        public void CreatePdfWithImage(string filePath, string image)
        {
            // Ouvrir le document
            Document pdfDocument = new Document(filePath);

            // Définir les coordonnées
            int lowerLeftX = 100;
            int lowerLeftY = 100;
            int upperRightX = 200;
            int upperRightY = 200;

            // Obtenir la page où l'image doit être ajoutée
            Page page = pdfDocument.Pages[1];

            // Charger l'image dans le flux
            FileStream imageStream = new FileStream(image, FileMode.Open);

            // Ajouter une image à la collection d'images des ressources de page
            page.Resources.Images.Add(imageStream);

            // Utilisation de l'opérateur GSave : cet opérateur enregistre l'état actuel des graphiques
            page.Contents.Add(new Aspose.Pdf.Operators.GSave());

            // Créer des objets Rectangle et Matrix
            Rectangle rectangle = new Rectangle(lowerLeftX, lowerLeftY, upperRightX, upperRightY);
            Matrix matrix = new Matrix(new double[] { rectangle.URX - rectangle.LLX, 0, 0, rectangle.URY - rectangle.LLY, rectangle.LLX, rectangle.LLY });

            // Utilisation de l'opérateur ConcatenateMatrix (matrice de concaténation): définit comment l'image doit être placée
            page.Contents.Add(new Aspose.Pdf.Operators.ConcatenateMatrix(matrix));
            XImage ximage = page.Resources.Images[page.Resources.Images.Count];

            // Utilisation de l'opérateur Do : cet opérateur dessine l'image
            page.Contents.Add(new Aspose.Pdf.Operators.Do(ximage.Name));

            // Utilisation de l'opérateur GRestore : cet opérateur restaure l'état graphique
            page.Contents.Add(new Aspose.Pdf.Operators.GRestore());

            // Enregistrer le document mis à jour
            pdfDocument.Save(filePath);

        }

    }
}
