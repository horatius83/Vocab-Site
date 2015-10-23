from django.http import HttpResponse
from django.template import RequestContext, loader

def index(request):
    template = loader.get_template('vocab/index.html')
    context = RequestContext(request, {})
    return HttpResponse(template.render(context))

def quiz(request):
    template = loader.get_template('vocab/quiz.html')
    context = RequestContext(request, {})
    return HttpResponse(template.render(context))


