import numpy as np
from numpy.lib.type_check import iscomplex, real, imag, mintypecode
from physics import g
import physics as phy
class Solution:
    def __init__(self,t,h):
        self.t=t
        self.h=h
    def __str__(self):
        return 't\n'+str(self.t)+'\nh\n'+str(self.h)
class Throw:
    def __init__(self,Bounces):
        self.Bounces=Bounces
class Ball:
    def __init__(self,throws,name='ball'):
        self.name=name
        self.throws=throws
class Configuration:
    def __init__(self,r,balls,V_hand,H_hand,Hmax,Vmax,Dmax,Hand_max):
        self.r=r
        self.balls=balls
        self.V_hand=V_hand
        self.H_hand=H_hand
        self.Hmax=Hmax
        self.Vmax=Vmax
        self.Dmax=Dmax
        self.Hand_max=Hand_max
    # v0 es la velocidad final de la pelota en la primera seccion de su movimiento
    def Beta1(self,t0,v0,i):
        return t0-(2*v0/phy.g)*((self.r-(self.r**(i+1)))/(1-self.r))
    def Beta(self,throw,t0):
        v0=phy.V01(t0,self.V_hand)
        return np.array([ self.Beta1(t0,v0,l) for l in range(0,throw.Bounces)])
    def Gamma(self,throw,t0):
        v0=phy.V01(t0,self.V_hand)
        return self.Beta1(t0,v0,throw.Bounces)+self.tb(v0,throw)
    def tb(self,v0,throw):
        # La altura final es la altura de las manos,la inicial es 0 pq parte de un rebote
        p=phy.PosOfProyectil(self.V_hand,0,v0*(self.r**throw.Bounces))
        res=min(p.roots)
        if iscomplex(res):
            raise Exception('la pelota no alcanza la altura {0} con la velocidad {1}'.format(self.V_hand,v0*(self.r**throw.Bounces)))
        return res
    def Satisfation(self,throw):
        v0b1=2*((self.V_hand*g*2)**0.5)/(self.r**throw.Bounces)
        poly=np.poly1d([-g,v0b1,-2*self.V_hand])
        result=list(poly.roots)
        result.sort()
        return tuple(result)
        
    def model(self,solution):
        t=solution.t
        h=solution.h
        R=[]
        for i in range(len(self.balls)):
            ball=self.balls[i]
            Inext=0
            R_p=[]
            for j in range(len(ball.throws)):
                throw=ball.throws[j]
                rl=self.Beta(throw,t[i][j])
                dl=self.Gamma(throw,t[i][j])
                bl=h[i][j]+rl
                R_p.append(Inext+bl)
                if j <(len(ball.throws)-1):
                    Inext+=dl+h[i][j]
            R.append(R_p)
        result=[]
        for r in R:
            for l in r:
                for i in l:
                    result.append(i)
        result.sort()
        return result
    @property
    def Hmin(self):
        pass
    @property
    def RestriccionH1(self):
        return ((2*phy.g*(self.Hmax-self.V_hand))**0.5+(2*phy.g*self.Hmax)**0.5)/phy.g
    @property
    def RestriccionV1(self):
        return ((self.Vmax**2-2*phy.g*self.V_hand)**0.5+self.Vmax)/phy.g
    @property
    def RestriccionH2(self):
        return ((2*g*self.Hmax)**0.5/self.r+(2*g*self.Hmax/self.r**2-2*self.V_hand*g)**0.5)/phy.g
    @property
    def RestriccionV2(self):
        return (self.Vmax-(self.Vmax**2-2*phy.g*self.V_hand)**0.5)/phy.g

    
# b1=Ball([Throw(5),Throw(3)],'b1')
# b2=Ball([Throw(2),Throw(1)],'b2')
# c=Configuration(0.7,[b1,b2],10,10,15,20,3,2)
# s=Solution([[16.87881,0.25],[0.2,0.3]],[[0.1,0.2],[0.36,0.05]])
# print(c.model(s))
# print(c.Satisfation(Throw(5)))