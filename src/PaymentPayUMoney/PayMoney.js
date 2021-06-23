import React from 'react';

class PayMoney extends React.PureComponent{





	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	data:{
					
						amount: "10.00",
						email: "erkuldeepshinde@gmail.com",
					
			}, 
			
				orderId: "",
				token: "",
				amount: "",
		
		
	    }

	


	}


payusingJSPaytm(){ 
const edata = { amount:100.00,email:'erkuldeepshinde@gmail.com'};

					fetch("http://localhost:3001/api/PayMoney/Paym/JsCheckout", { 
					   method: 'post',
					   headers: {
						   'Accept': 'application/json, text/plain, */*',
						   'Content-Type': 'application/json'
						   
					   },
				   
					   body: JSON.stringify(edata)
				   })
				   .then(res => res.json())
				   .then(data => {
					   var FinalPayPayload = {
						orderId: data.PayPayload.orderId, /* update order id */
						token: data.PayPayload.txnToken,
						amount: data.PayPayload.value /* update amount */
					   }
					
					  // console.log("PAYTM DATA",data.PayPayload)
					   //console.log("PAYTM DATA",  dataobjct.body.txnToken)
					 //  console.log("state",  this.state.amount)
					  // this.launchJSPayMode(makeReq)
					  window.Paytm.CheckoutJS.init({
						"data": {
						  "orderId": FinalPayPayload.orderId, /* update order id */
						  "token": FinalPayPayload.token,   /* update token value */
						  "tokenType": "TXN_TOKEN",
						  "amount": FinalPayPayload.amount   /* update amount */
						},
						handler: {
						  notifyMerchant: function (eventName, data) {
							console.log("notifyMerchant handler function called");
							console.log("eventName => ", eventName);
							console.log("data => ", data);
						  }
						}
					  });
					  window.Paytm.CheckoutJS.invoke();
					   
					   
				   })
   
}



						
	render(){ 
		return 	<div style={{height:"1000px"}}>  



<div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword"></input>
    </div>
  </div>
					
					<button  style={{marginRight:"5px"}} type="button" class="btn btn-outline-secondary" onClick={() => this.payusingJSPaytm()}>payusingJSPaytm</button>

					
	
			
			    </div>
	}

}

export default PayMoney;