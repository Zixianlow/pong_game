"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 4.2.17.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-n%*fofpj=-xwl417i*u6o_gyap67x%-djz-n=61sk%@o6##1!('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8000", 
    "http://127.0.0.1:8000", 
]
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
APPEND_SLASH=False


# Application definition

INSTALLED_APPS = [
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'django_prometheus',
    'auth_app',
    'users_app',
    'match_app',
    'chat_app',
    'pong_app',
    'spa',
    'channels',
]

AUTH_USER_MODEL = 'auth_app.CustomUser'

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

MIDDLEWARE = (
    ["django_prometheus.middleware.PrometheusBeforeMiddleware"]
    + MIDDLEWARE
    + ["django_prometheus.middleware.PrometheusAfterMiddleware"]
)

# Logging Configuration
# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'formatters': {
#         'simple': {
#             'format': '%(levelname)s %(message)s'
#         },
#         'verbose': {
#             'format': '%(levelname)s %(asctime)s %(module)s '
#                       '%(process)d %(thread)d %(message)s'
#         },
#     },
#     'handlers': {
#         'console': {
#             'level': 'INFO',
#             'class': 'logging.StreamHandler',
#             'formatter': 'simple'
#         },
#         'logstash': {
#             'level': 'INFO',
#             'class': 'logstash.TCPLogstashHandler',
#             'host': os.environ.get("LOGSTASH_HOST"),
#             'port': os.environ.get("LOGSTASH_PORT"),
#             'version': 1,
#             'message_type': 'django',
#             'fqdn': False,
#             'tags': ['django'],
#         },
#     },
#     'root': {
#         'handlers': ['logstash'],
#         'level': 'INFO',
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console', 'logstash'],
#             'level': 'WARNING',
#             'propagate': False,
#         },
#     }
# }

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI_APPLICATION = 'core.wsgi.application'

ASGI_APPLICATION = 'core.asgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django_prometheus.db.backends.postgresql',
    #     # "NAME": config('POSTGRES_DB'),
    #     # "USER": config('POSTGRES_USER'),
    #     # "PASSWORD": config('POSTGRES_PASSWORD'),
    #     "NAME": os.environ['POSTGRES_DB'],
    #     "USER": os.environ['POSTGRES_USER'],
    #     "PASSWORD": os.environ['POSTGRES_PASSWORD'],
    #     "HOST": 'postgresql',
    #     "PORT": '5432',
    # }
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

# Make sure STATIC_URL is defined (it usually is by default)
STATIC_URL = '/static/'

# If you want to serve static files locally in development:
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels_redis.core.RedisChannelLayer",
#         "CONFIG": {
#             "hosts": [("redis", 6379)],
#         },
#     },
# }

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}
