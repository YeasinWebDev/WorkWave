import Stripe from "stripe"

export const checkoutOrder = async(payment) =>{
    const liveUrl = process.env.NEXT_PUBLIC_Live_URL
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'BDT',
                    product_data: {
                        name: payment.name,
                        images:[payment.img]
                    },
                    unit_amount: payment.salary * 100,
                },
                quantity: 1,
            }],
            metadata:{
                paymentBy: payment.paymentBy,       
                name: payment.name,                
                email: payment.email,              
                img: payment.img,                  
                salary: payment.salary,            
                payrollDate: payment.payrollDate,
            },
            mode:'payment',
            success_url: `${liveUrl}/dashboard/payments`,
            cancel_url: `${liveUrl}/`,
        })

        if (session && session.url) {
            window.location.href = session.url;
          } else {
            console.error('Session URL not found in session object:', session);
          }
    } catch (error) {
        console.error("Stripe error:", error);
    }
}