from rest_framework import pagination


class Pagination(pagination.PageNumberPagination):
    """ Постраничный вывод """
    page_size = 20
    page_query_param = 'page_size'
