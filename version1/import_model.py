from scipy.spatial import ConvexHull
import numpy as np


def get_n_paths(shape):
    return len(shape)

def get_n_points(shape):
    return sum( len(path) for path in shape )

def get_width(shape):
    x_min = float('inf')
    x_max = -float('inf')

    for path in shape:
        for point in path:
            x,y = point
            x_min = min(x, x_min)
            x_max = max(x, x_max)

    return x_max - x_min

def get_height(shape):
    y_min = float('inf')
    y_max = -float('inf')

    for path in shape:
        for point in path:
            x,y = point
            y_min = min(y, y_min)
            y_max = max(y, y_max)

    return y_max - y_min

def get_elongation(shape):
    w, h = get_width(shape), get_height(shape)
    return (1 + max(w, h)) / (1 + min(w, h))

def get_hull_shape(shape):
    points = [ [point[0], 400-point[1]] for path in shape for point in path ]
    points = np.array(points)
    hull = ConvexHull(points)
    envelop_points = hull.points[hull.vertices]
    return envelop_points

def get_distance(A, B):
    xa, ya = A
    xb, yb = B
    return ((xa-xb)**2 + (ya-yb)**2)**.5

def get_length(points):
    length = 0
    for ip in range(len(points)):
        p0 = points[ip]
        p1 = points[(1+ip)%len(points)]
        length+= get_distance(p0, p1)
    return length

def get_triangleArea(A,B,C):
    a = get_distance(A, B)
    b = get_distance(B, C)
    c = get_distance(C, A)

    p = (a+b+c)/2
    area = (p * (p-a) * (p-b) * (p-c))**.5
    return area


def get_area(points):
    area = 0
    A = points[0]
    for ip in range(1,len(points)-1):
        B= points[ip]
        C= points[ip + 1]
        area += get_triangleArea(A, B, C)

    return area

def get_roundness(shape):
    from math import pi
    hull_points = get_hull_shape(shape)
    length = get_length(hull_points)
    area = get_area(hull_points)
    R = length/(2*pi)
    circle_area = pi*R**2
    roundness = area/circle_area
    return roundness

def get_length2(shape):
    hull_points = get_hull_shape(shape)
    length = get_length(hull_points)
    return length

def get_area2(shape):
    hull_points = get_hull_shape(shape)
    area = get_area(hull_points)
    return area

info = {
    'n_paths': get_n_paths,
    'n_points' : get_n_points,
    'width' : get_width,
    'height' : get_height,
    'elongation' : get_elongation,
    'roundness' : get_roundness,
    'length' : get_length2,
    'area' : get_area2,
}

import pickle
with (  open('model\model.pkl', 'rb') as modelf,
        open('model\encoder.pkl', 'rb') as encoderf,
        open('model\scaler.pkl', 'rb') as scalerf) :
    
    model = pickle.load(modelf)
    encoder = pickle.load(encoderf)
    scaler = pickle.load(scalerf)

def preprocessing(data):
    data = scaler.transform(data)
    return data

def data_extractor(paths):
    data = []
    for func in info.values():
        data.append(func(paths))
    
    return np.array(data)

def get_class(data):
    y = model.predict(data)
    return encoder.inverse_transform(y)[0]

def predict(paths):
    data = data_extractor(paths)
    data = data.reshape((1,-1))
    data = preprocessing(data)
    return get_class(data)



