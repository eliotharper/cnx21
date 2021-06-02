<script language='javascript' runat='server'>
Platform.Load('Core', '1');

// Arrays of allowed values for both Sender Address and Sender Origin
// Sender Address is the from address when you send an email, make sure your expected from address is included in the list
// Sender Origin represents the domain originating the request
// The Marketing Cloud origin is in place to allow testing in Subscriber Preview, update that value to match your stack
var isAllowed = {
  senderAddress:[
    'amp@gmail.dev', 
    'AMPInternalPilot@salesforce.com'
  ],
  senderOrigin:[
    'https://playground.amp.dev',
    'https://amp.gmail.dev',
    'https://mail.google.com',
    'https://user-content.s10.sfmc-content.com' // update to SFMC stack
  ]
}

// Getting headers from the request made to the Code Resource
var emailSender = Platform.Request.GetRequestHeader("AMP-Email-Sender")
var emailOrigin = Platform.Request.GetRequestHeader("Origin")
var sourceOrigin = Platform.Request.GetQueryStringParameter("__amp_source_origin");

//Helper function to check arrays
Array.includes = function(req, arr) {
  for(i = 0; i < arr.length; i++) {
    if (!ret || ret == false) { 
      ret = req.toUpperCase() == arr[i].toUpperCase() ? true: false;
      }
    }
  return ret;
}

// Check the email sender and origin from the request against the allowed values in `isAllowed`
// If anything fails, an error is raised and the request returns no data
if(emailSender) {
  if(Array.includes(emailSender, isAllowed.senderAddress)) {
    HTTPHeader.SetValue("AMP-Email-Allow-Sender", emailSender)
  } else {
    Platform.Function.RaiseError("Sender Not Allowed",true,"statusCode","3");
  }
} else if(emailOrigin) {
  if(Array.includes(emailOrigin, isAllowed.senderOrigin)) {
    if (sourceOrigin) {
      HTTPHeader.SetValue("Access-Control-Allow-Origin", emailOrigin);
      HTTPHeader.SetValue("Access-Control-Expose-Headers", "AMP-Access-Control-Allow-Source-Origin");
      HTTPHeader.SetValue("AMP-Access-Control-Allow-Source-Origin", sourceOrigin);
      // added for testing in certain environments
      HTTPHeader.SetValue("Access-Control-Allow-Credentials", "true");
    }
  } else {
    Platform.Function.RaiseError("Origin Not Allowed",true,"statusCode","3");
  }
} else {
  // If neither header is present raise an error and return no data
  Platform.Function.RaiseError("Origin and Sender Not Present",true,"statusCode","3");
}



if (Platform.Request.Method=='POST') { // amp-form xhr request

   var id = Platform.Request.GetFormField('wishlist-id');
   var action = Platform.Request.GetFormField('action');

   // add action here

   var resp = {
    id: id,
    action: action,
    updated: true
    };

  Write(Stringify(resp));


} else { // amp-list xhr request

  obj = {
     items:[
        {
           id:'ao_nang',
           image:'https://dy9wp9h0ubcmy.cloudfront.net/ao-nang.jpg',
           title:'Ao Nang Beach, Thailand',
           content:'Ao Nang is a resort town in southern Thailand\'s Krabi Province. It\'s known for a long Andaman coast beachfront and access to dive sites off the nearby islands in its bay.',
           url:'https://www.tripadvisor.com.au/Attraction_Review-g1507054-d7155397-Reviews-Ao_Nang_Beach-Ao_Nang_Krabi_Town_Krabi_Province.html'
        },
        {
           id:'haad_rin',
           image:'https://dy9wp9h0ubcmy.cloudfront.net/haad-rin.jpg',
           title:'Haad Rin, Thailand',
           content:'Hat Rin is a peninsular beach area and town on the southern tip of Ko Pha-ngan, an island in the Gulf of Thailand. Its two main beaches are Sunset Beach to the south and the larger Sunrise Beach to the north.',
           url:'https://www.tripadvisor.com.au/Attraction_Review-g303907-d556707-Reviews-Haad_Rin-Ko_Pha_Ngan_Surat_Thani_Province.html'
        },
        {
           id:'pattaya_south',
           image:'https://dy9wp9h0ubcmy.cloudfront.net/pattaya-south.jpg',
           title:'Pattaya South, Thailand',
           content:'A visit to Pattaya is a wonderful way to explore the beaches along the Gulf of Thailand. Relaxed and family-friendly Jomtien Beach is a hot spot for watersports and seaside massages.',
           url:'https://www.tripadvisor.com.au/Tourism-g293919-Pattaya_Chonburi_Province-Vacations.html'
        },
        {
           id:'phi_phi_don',
           image:'https://dy9wp9h0ubcmy.cloudfront.net/phi-phi-don.jpg',
           title:'Phi Phi Don, Thailand',
           content:'The largest of the Phi Phi Islands, Ko Phi Phi Don is a non-volcanic island, made mostly of limestone. Accessible from Phuket, Ko Phi Phi Don has great beaches and popular diving and snorkeling spots.',
           url:'https://www.tripadvisor.com.au/Tourism-g303908-Ko_Phi_Phi_Don_Krabi_Province-Vacations.html'
        },
        {
           id:'patong_beach',
           image:'https://dy9wp9h0ubcmy.cloudfront.net/patong-beach.jpg',
           title:'Patong Beach, Thailand',
           content:'Patong is a beach resort town on the west coast of Phuket Island, facing the Andaman Sea in the southwest of Thailand. Its sandy, crescent beach is lined with cafes, restaurants and bars.',
           url:'https://www.tripadvisor.com.au/Attraction_Review-g297930-d2454044-Reviews-Patong_Beach-Patong_Kathu_Phuket.html'
        }
     ]
  };
Write(Stringify(obj));
}


</script>