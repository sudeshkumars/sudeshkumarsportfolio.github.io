document.addEventListener('DOMContentLoaded', () => {
    

    try {
        emailjs.init("5_G8A9TeZx1GARsk2"); 
    } catch (e) {
        console.log("EmailJS not loaded yet");
    }


    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .fade-in-up').forEach(el => observer.observe(el));

  
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = document.querySelector('.submit-btn');
            const msg = document.getElementById('successMsg');
            
           
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
          
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

     
            emailjs.send("service_1x5cs07", "template_g62ym8n", {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            })
            .then(() => {
             
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                msg.style.display = 'block';
                msg.style.backgroundColor = "#dcfce7";
                msg.style.color = "#15803d";
                msg.innerText = "Message Sent Successfully!";
                
                setTimeout(() => {
                    msg.style.display = 'none';
                }, 4000);
            })
            .catch((err) => {
           
                console.error('EmailJS Error:', err);
                btn.innerHTML = originalText;
                btn.disabled = false;
                msg.style.display = 'block';
                msg.style.backgroundColor = "#fee2e2";
                msg.style.color = "#dc2626";
                msg.innerText = "Failed to send. Check console.";
            });
        });
    }
});