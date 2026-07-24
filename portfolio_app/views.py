import traceback

from django.shortcuts import render, redirect
from django.contrib import messages
from django.conf import settings
from django.core.mail import send_mail
from portfolio_app.models import Contact, Project


def send_contact_emails(sender_email, owner_recipient, user_recipient, email_subject, email_body, confirmation_subject, confirmation_body):
    try:
        if owner_recipient:
            send_mail(
                email_subject,
                email_body,
                sender_email,
                [owner_recipient],
                fail_silently=False,
            )

        if user_recipient:
            send_mail(
                confirmation_subject,
                confirmation_body,
                sender_email,
                [user_recipient],
                fail_silently=False,
            )
    except Exception:
        print("========== EMAIL ERROR ==========")
        traceback.print_exc()
        print("=================================")


def home(request):
    projects = Project.objects.all()[:3]  # Get latest 3 projects
    context = {'projects': projects}
    return render(request, 'index.html', context)

def all_projects(request):
    projects = Project.objects.all()
    context = {'projects': projects}
    return render(request, 'projects.html', context)

def contact(request):
    if request.method == "POST":
        print("POST request received")

        name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        content = request.POST.get("content")

        print(name, email, subject, content)

        # Validate Name
        if not (1 < len(name) < 30):
            messages.error(request, "Length of name should be greater than 2 and less than 30 characters")
            return redirect('home')

        # Validate Email
        if not (1 < len(email) < 30):
            messages.error(request, "Invalid email, try again")
            return redirect('home')

        # Validate Subject
        if not (1 < len(subject) < 30):
            messages.error(request, "Length of subject should be greater than 2 and less than 30 characters")
            return redirect('home')

        # Save to database
        ins = Contact(name=name, email=email, subject=subject, content=content)
        ins.save()

        # Send the saved message to the site owner and a confirmation to the user in the background
        sender_email = settings.EMAIL_HOST_USER
        owner_recipient = sender_email
        user_recipient = email

        email_subject = f"New contact message: {subject}"
        email_body = f"Name: {name}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{content}"
        confirmation_subject = "Thanks for contacting me!"
        confirmation_body = (
            f"Hi {name},\n\n"
            "Thank you for reaching out. I have received your message and will reply soon.\n\n"
            "Your message:\n"
            f"{content}\n\n"
            "Best regards,\n"
            "Portfolio Team"
        )

        send_contact_emails(
            sender_email,
            owner_recipient,
            user_recipient,
            email_subject,
            email_body,
            confirmation_subject,
            confirmation_body,
        )

        messages.success(request, "Thank you for contacting me! Your message has been saved")
        print("Data has been saved to database")

        return redirect('home')  # ✅ avoid duplicate form submissions

    # If GET request
    print("The request is not POST")
    return render(request, 'contact.html')   # ✅ better to use contact.html
