import React from "react";
import "../components/Invoice.css";
const Invoice = () => {
  return (
    <>
      <div className="MainContainer">
        <div className="Details">
          <label className="Heading">
            Gerra Imperium
          </label>
          <br />
          <label className="Address">
            Patto, Panaji-Goa 
          </label>
          <br />
          <label className="RegistrationNo">
            Registration No: 
          </label>
          <br />

          <div className="NumDetails">
            <div className="GSTNumDetails">
              <label>
                <b>GST Number:</b> &nbsp; 
              </label>
            </div>
            <div className="PANNumDetails">
              <label>
                <b>PAN Number: </b> &nbsp; 
              </label>
            </div>
          </div>
        </div>
        <div className="LogoOP">
          <img src="/images/loginlogo.svg" alt="Logo"></img>
        </div>
      </div>
      <hr />

      <div className="TableDetailsContainer">
        <table className="PersonDetails">
          <tr>
            <td>
              Owner: &nbsp; <b> Mr. Keshav Methar</b>
            </td>
            <td>
              Invoice Number: &nbsp; <b># 0001</b>
            </td>
          </tr>
          <tr>
            <td>
              House: &nbsp; <b>A-101</b>
            </td>
            <td>
              Invoice Date: &nbsp; <b>27 Jan 2023</b>
            </td>
          </tr>
          <tr>
            <td>
              Area (Sq.ft): &nbsp; <b> - </b>
            </td>
            <td>
              Due Date: &nbsp; <b>10 Feb 2023</b>
            </td>
          </tr>
          <tr>
            <td>
              Owner Address: &nbsp; <b> A-101</b>
            </td>
          </tr>
        </table>
        <br />
        <div className="AandPLAbel">
          <label>Arrears & Penalty</label>
        </div>
        <br />
        <table className="PersonDetails">
          <tr>
            <th colSpan="2">Description</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td colSpan="2">Arrears/Advance(-) </td>

            <td>(-) 0.37 </td>
          </tr>
          <tr>
            <td colSpan="2">Penalty/Interests on Arrears</td>
            <td>0.0 </td>
          </tr>
          <tr>
            <th colSpan="2">SUB TOTAL</th>
            {/* <th>SUB TOTAL</th> */}
            <th>(-) 0.37</th>
          </tr>
        </table>
        <br />
        <div className="AandPLAbel">
          <label>Maintenance Invoice January 2023</label>
        </div>
        <br />
        <table className="PersonDetails">
          <tr>
            <th>Description</th>
            <th>HSN/SAC</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>Repair & Maintenance Charges</td>
            <td> </td>
            <td>4,917.00</td>
          </tr>
          <tr>
            <td>Sinking Fund</td>
            <td> </td>
            <td>333.00</td>
          </tr>
          <tr>
            <td>Non-Occupancy Charges</td>
            <td> </td>
            <td>525.00</td>
          </tr>
          <tr>
            <td>Maintenance (Reimbursement of Society Electricity Charges)</td>
            <td> </td>
            <td>1,665.00</td>
          </tr>
          <tr>
            <th> </th>
            <th>SUB TOTAL</th>
            <th>7,440.00</th>
          </tr>
        </table>

        <br />
        <table className="Persondetails">
          <tr>
            <th colSpan="2"> GRAND TOTAL</th>
            <th>7,439.63 </th>
          </tr>
          <tr>
            <td colSpan="3">
              In Words: &nbsp;{" "}
              <b>
                Rupees Seven Thousand Four Hundred Thirty Nine And Sixty Three
                Paisa Only
              </b>
            </td>
          </tr>
        </table>

        <label className="ComputerizedMessage">
          <i>
            This is a computer generated invoice and requires no authentication.
          </i>
        </label>
        <br/>
        <div className="InstructionPara">
       <h4>Note: </h4>
       <label>1. Cheque in favor of “Gerra Imperium”. Due Date for Cheque 10 th of Every Month.</label><br/>
       <label>2. Bank A/c details:</label><br/>
       <label>Account Number : </label><br/>
       <label>Account Name : </label><br/>
       <label>Bank IFSC code : </label><br/>
       <label>Branch : </label><br/>
       <label>3. Please send email to support@xpressgate.com to confirm Online Transfer.</label><br/>
       <label>4. Online Payment through MyGate App also available.</label><br/>
       <label>5. Bank Charges will be charged if your cheque is issued on a bank outside Pune or cheque bounce.</label><br/>
       <label>6. No exemption can be claimed for non-receipt of bill for regular maintenance Bills.</label><br/>
       <label>7. Please subscribe to Email Bills to save paper waste.</label><br/>
       <label>8. Penalty of dishonored cheque will be charged as per Bank charges.</label><br/>
       <label>9. If payment is not made by due date, Interest @ 12% p.a will be levied.</label><br/>
       <label>10. Please Contact Society Manager and for support.</label><br/>
        </div>
        <br/>
      </div>
    </>
  );
};

export default Invoice;
