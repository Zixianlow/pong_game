from django.shortcuts import render

def spa_index(request):
    return render(request, 'spa_index.html')
