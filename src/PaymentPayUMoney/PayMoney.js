import React from 'react';

class PayMoney extends React.PureComponent{





	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	data:{
						key  : "iF0e1A",
						txnid: "0nf725",
						amount: "100.00",
						pinfo: "Book1",
						fname: "kuldeep",
						udf5: "BOLT_KIT_NODE_JS",
						salt: "BfrQ8784",
			}, 
			hash:""
	    }
		this.loadTestDBFromServer = this.loadTestDBFromServer.bind(this);
		this.launchPayment = this.launchPayment.bind(this);

	}


	launchPayment(pd)
{
	console.log("Inside javascript 7")


	bolt.launch({
	key: pd.key,
	txnid: pd.txnid, 
	hash:pd.hash,
	amount: pd.amount,
	firstname: pd.fname,
	email: pd.email,
	phone: pd.phone,
	productinfo: pd.pinfo,
	udf5: "BOLT_KIT_NODE_JS",
	surl : pd.surl,
	furl: pd.furl
},{ responseHandler: function(BOLT){
	console.log("Inside javascript 9")
	console.log( BOLT.response.txnStatus );		
	if(BOLT.response.txnStatus != 'CANCEL')
	{ console.log("Inside javascript 3")
		//Salt is passd here for demo purpose only. For practical use keep salt at server side only.
		var fr = '<form action=\"'+pd.surl+'\" method=\"post\">' +
		'<input type=\"hidden\" name=\"key\" value=\"'+BOLT.response.key+'\" />' +
		'<input type=\"hidden\" name=\"salt\" value=\"'+pd.salt+'\" />' +
		'<input type=\"hidden\" name=\"txnid\" value=\"'+BOLT.response.txnid+'\" />' +
		'<input type=\"hidden\" name=\"amount\" value=\"'+BOLT.response.amount+'\" />' +
		'<input type=\"hidden\" name=\"productinfo\" value=\"'+BOLT.response.productinfo+'\" />' +
		'<input type=\"hidden\" name=\"firstname\" value=\"'+BOLT.response.firstname+'\" />' +
		'<input type=\"hidden\" name=\"email\" value=\"'+BOLT.response.email+'\" />' +
		'<input type=\"hidden\" name=\"udf5\" value=\"'+BOLT.response.udf5+'\" />' +
		'<input type=\"hidden\" name=\"mihpayid\" value=\"'+BOLT.response.mihpayid+'\" />' +
		'<input type=\"hidden\" name=\"status\" value=\"'+BOLT.response.status+'\" />' +
		'<input type=\"hidden\" name=\"hash\" value=\"'+BOLT.response.hash+'\" />' +
		'</form>';
		var form = jQuery(fr);
		jQuery('body').append(form);								
		form.submit();
	}
},
	catchException: function(BOLT){ console.log("Inside javascript 1", BOLT)
 		alert( BOLT.message );
		console.log("BOLT MSG", BOLT.message)
	}
});
console.log("Inside javascript")

}



 loadTestDBFromServer(){ console.log("API IS IN LEVEL !")

	const formData = { 
						key  : "iF0e1A",
						txnid: "0nf725",
						amount: "100.00",
						pinfo: "Book1",
						fname: "Mevlus",
						udf5: "BOLT_KIT_NODE_JS",
						salt: "BfrQ8784",
						email: "erkuldeepshinde@gmail.com"
					 };


					 var pd = {
						key: "iF0e1A",
						txnid: "",
						amount:"100.00",
						fname: "Mevlus",
						email: "erkuldeepshinde@gmail.com",
						phone: "8770639505",
						pinfo: "Book1",
						surl: "http://localhost:3000/response.html",
						furl: "http://localhost:3000/response.html",
						hash: ""
				   };
				   let data = {
					'txnid': pd.txnid,
					'email': pd.email,
					'amount': pd.amount,
					'productinfo': pd.productinfo,
					'firstname': pd.firstname
				};
				let self = this;

					 fetch(this.props.url, { 
						method: 'post',
						headers: {
							'Accept': 'application/json, text/plain, */*',
							'Content-Type': 'application/json'
							
						},
					
						body: JSON.stringify(formData)
					})
					.then(res => res.json())
					.then(data => {
						
						
						

						pd.hash = data.hash;
						pd.txnid = data.ord;
						this.setState({ hash: data.hash })
						console.log("DATA DATA DATA ", pd)
						this.launchPayment(pd);
						
					})
	
}


						
	render(){ console.log("Yes this is called succesfully")
		return 	<div>  
					<div class="mainPayment">
	<div>
		<img src="assets/img/payment/payumoney.png" alt="dtdytfdytfd" ></img>
    </div>
    <div>
    	<h3>Payment Page</h3>
    </div>
	<form action="#" onSubmit={this.loadTestDBFromServer} id="payment_form">
    <input type="hidden" id="udf5" name="udf5" value="BOLT_KIT_NODE_JS" />
    <input type="hidden" id="surl" name="surl" value="http://localhost:3000/response.html" />
    <div class="dvPayment">
    <span class="textPayment"><label>Merchant Key:</label></span>
    <span><input type="text" id="key" name="key" placeholder="Merchant Key" value="iF0e1A" /></span>
    </div>
    
    <div class="dvPayment">
    <span class="textPayment"><label>Merchant Salt:</label></span>
    <span><input type="text" id="salt" name="salt" placeholder="Merchant Salt" value="BfrQ8784" /></span>
    </div>
    
    <div class="dvPayment">
    <span class="textPayment"><label>Transaction/Order ID:</label></span>
    <span><input type="text" id="txnid" name="txnid" placeholder="Transaction ID" value="0nf725" /></span>
    </div>
    
    <div class="dvPayment">
    <span class="textPayment"><label>Amount:</label></span>
    <span><input type="text" id="amount" name="amount" placeholder="Amount" value="100.00" /></span>    
    </div>
    
    <div class="dvPayment">
    <span class="textPayment"><label>Product Info:</label></span>
    <span><input type="text" id="pinfo" name="pinfo" placeholder="Product Info" value="Book1" /></span>
    </div>
    
    <div class="dvPayment">
    <span class="textPayment"><label>First Name:</label></span>
    <span><input type="text" id="fname" name="fname" placeholder="First Name" value="Mevlus" /></span>
    </div>
    
    <div class="dvPayment">
    <span class="textPayment"><label>Email ID:</label></span>
    <span><input type="text" id="email" name="email" placeholder="Email ID" value="erkuldeepshinde@gmail.com" /></span>
    </div>
    
    <div class="dvPayment">
    <span class="textPayment"><label>Mobile/Cell Number:</label></span>
    <span><input type="text" id="mobile" name="mobile" placeholder="Mobile/Cell Number" value="8770639505" /></span>
    </div>
    
    <div class="dvPayment">
    <span class="textPayment"><label>Hash:</label></span>
    <span><input type="text" id="hash" name="hash" placeholder="Hash" value={this.state.hash} /></span>
    </div>
    <div id="alertinfo" class="dvPayment"></div>
    
    <div><input type="submit" value="Pay" return false/></div>
	</form>
</div>

	
			
			    </div>
	}

}

export default PayMoney;