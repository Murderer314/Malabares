import numpy as np
import sympy as sp
g=9.8
import random as rnd
rnd.randint(0,1)
def Error(R,Rs):
    if len(R)!=len(Rs):
        raise Exception('Los vectores R y Rs tienen que ser del mismo tamaño')
    return sum([(R[i]-Rs[i])**2 for i in range(len(R))])**0.5
def VelocityOfProyectil(vy,v0y):
    return np.poly1d([-g,v0y-vy])
def PosOfProyectil(y,y0,v0y):
    return np.poly1d([-g/2,v0y,y0-y])
def V01(t0,h):
    return (-g*(t0**2)-2*h)/(2*t0)

# print(Error([1,2],[3,2]))