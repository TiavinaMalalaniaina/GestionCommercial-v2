using System;
using System.Net;
using System.Net.Mail;
using EASendMail;
namespace sales_departements.Models.email;

public class Email
{
    
    public void SendEmailToSupplier(string supplier) {

        SmtpMail oMail = new SmtpMail("TryIt");
        string filePath = "D:/ITUniversity/Projets/S5/Mr Tovo/SALES/document.pdf";
        // Set sender email address, display name, user name and password.
        oMail.From = "ramarosonbenjamina@gmail.com";
        oMail.To = supplier;
        oMail.Subject = "Test Email Subject";
        oMail.TextBody = "This is the email body text.";
        oMail.AddAttachment(filePath);

        SmtpServer oServer = new SmtpServer("smtp.gmail.com");
        oServer.User = "ramarosonbenjamina@gmail.com";
        oServer.Password = "ttjq jeqn ixlx tdwb"; //GENERENLAH AVY @ao @ google fa tsy mety ra mdp tsotra 
        oServer.Port = 587; // Use 465 for SSL connection.

        // Enable SSL/TLS connection, most email servers require this option.
        oServer.ConnectType = SmtpConnectType.ConnectSSLAuto;

        EASendMail.SmtpClient oSmtp = new EASendMail.SmtpClient();
        oSmtp.SendMail(oServer, oMail);

    }
}