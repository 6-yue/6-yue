from django.http import HttpResponse
 
def hello(request):
    return HttpResponse("my name is py")