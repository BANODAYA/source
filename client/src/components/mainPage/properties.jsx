import React from "react";
import createClass from "create-react-class";

class NewComponent extends React.PureComponent {
	render() {
	  return (
		<div>
		  {/* saved from url=(0089)file:///C:/Users/sravya/Desktop/HTMLcheatsheet/Real%20Estate%20Investment%20Analysis.html */}
		  <meta httpEquiv="Content-Type" content="text/html; charset=windows-1252" />
		  <title>Properties List</title>
		  <h1>Rental Properties</h1>
		  <h2>Buy-Rent-Hold</h2>
		  <h3>Property Info</h3>
		  <br />
		  {/* <form action="file:///C:/Users/sravya/Desktop/HTMLcheatsheet/process.php" method="POST"> */}
		  <div>
			<label>Address</label>
			<input type="text" name="Address" placeholder="Enter Address" />
		  </div>
		  <br />
		  <div>
			<label>State</label>
			<input type="text" name="State" placeholder="Enter State" />
		  </div>
		  <br />
		  <div>
			<label>city</label>
			<input type="text" name="city" placeholder="Enter city" />
		  </div>
		  <br />
		  <div>
			<label>Locality</label>
			<input type="text" name="locality" placeholder="Enter Locality" />
		  </div>
		  <br />
		  <div>
			<label>Pincode</label>
			<input type="text" name="Pincode" placeholder="Enter Pincode" />
		  </div>
		  <br />
		  <div>
			<label>Fair Market Value</label>
			<input type="text" name="Fair Market Value" placeholder="Fair Market Value" />
		  </div>
		  <br />
		  <div>
			<label>Vacancy Rate</label>
			<input type="text" name="Vacancy Rate" placeholder="Vacancy Rate" />
		  </div>
		  <br />
		  <div>
			<label>Annual Appreciation Rate</label>
			<input type="text" name="Annual Appreciation Rate" placeholder="Annual Appreciation Rate" />
		  </div>
		  <br />
		  <h3>Purchase Info</h3>
		  <div>
			<label>Offer Price</label>
			<input type="text" name="Offer Price" placeholder="Enter Offer Price" />
		  </div>
		  <br />
		  <div>
			<label>Real Purchase Price (RPP)</label>
			<input type="text" name="Real Purchase Price (RPP)" placeholder="ENTER RPP" />
		  </div>
		  <br />
		  <h4>Income (Annual)</h4>
		  <div>
			<label>Gross Rents	</label>
			<input type="text" name="Gross Rents	" placeholder="Enter Gross Rents" />
		  </div>
		  <br />
		  <div>
			<label>Total Income	</label>
			<input type="text" name="Total Income	" placeholder="Total Income" />
		  </div>
		  <br />
		  <h5>Operating Expenses (Annual)</h5>
		  <div>
			<label>Property Taxes</label>
			<input type="text" name="Property Taxes		" placeholder="Enter Property Taxes	" />
		  </div>
		  <br />
		  <div>
			<label>Repairs	</label>
			<input type="text" name="Repairs" placeholder="Enter Repairs" />
		  </div>
		  <br /><div>
			<label>Maintenance</label>
			<input type="text" name="Maintenance	" placeholder="Enter Total Maintenance" />
		  </div>
		  <br />
		  <div>
			<label>Total Expenses</label>
			<input type="text" name="Total Expenses" placeholder="Enter Total Expenses" />
		  </div>
		  <br />
		  <h6> Net Operating Income (Annual)</h6>
		  <div>
			<label>Net Operating Income		</label>
			<input type="text" name="Net Operating Income		" placeholder="Enter Net Operating Income" />
		  </div>
		  <br />
		  <h7>Cash Requirements</h7>
		  <div>
			<label>Total Cash Required</label>
			<input type="text" name="Total Cash Required	" placeholder="Enter Total Cash Required" />
		  </div>
		  <br />
		  <h9>Quick Analysis</h9>
		  <div>
			<label>Total ROI (After 1 Year)</label>
			<input type="text" name="Total ROI (After 1 Year)" placeholder="Enter Total ROI (After 1 Year)" />
		  </div>
		  <br />
		  <div>
			<label>Expense to Income Ratio	</label>
			<input type="text" name="Expense to Income Ratio" placeholder="Enter Expense to Income Ratio" />
		  </div>
		  <br />
		  <input type="submit" name="Submit" defaultValue="Submit" />
		  <div style={{marginTop: '500px'}} />
		</div>
	  );
	}
  };
  export default NewComponent;