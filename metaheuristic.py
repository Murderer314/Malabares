from Model import Configuration
from Model import np
from Model import Ball
from Model import Throw
from Model import Solution
import Model

class DifferentialEvolution:
    # El configuration contiene la informacion de la pos de las manos el factor de restitucion, las pelotas, los lanzamientos, rebotes
    def __init__(self, configuration,Rs,Lenght):
        self.Rs=Rs
        self.configuration = configuration
        self.poblation=self.initialPopulation(Lenght)
    def Ran1BinAlgorithm(self):
        pass
    
    def initialPopulation(self,Lenght):
        result=[]
        t_max=min([self.configuration.RestriccionH1,self.configuration.RestriccionH2,self.configuration.RestriccionV1,self.configuration.RestriccionV2])
        for _ in range(Lenght):
            # las listas t y h de la posible solucion
            t=[]
            h=[]
            # Por cada pelota 
            for ball in self.configuration.balls:
                t_b=[]
                h_b=[]
                # Por cada tiro de la pelota ball
                for throw in ball.throws:
                    # Tiro un random de los valores que puede tomar t y h
                    t_d,t_u=self.configuration.Satisfation(throw)
                    
                    #Cojo un valor random del primer intervalo y otro del segundo intervalo
                    t_b0=np.random.uniform(0,min(t_d,t_max))
                    if t_u<=t_max:
                        t_b1=np.random.uniform(t_u,t_max)
                        v=t_b0+np.random.binomial(1,0.5)*(t_b1-t_b0)
                        #despues selecciono uno de los dos
                        t_b.append(t_b0+np.random.binomial(1,0.5)*(t_b1-t_b0))
                    #si no, me olvido del itervalo
                    else:
                        t_b.append(t_b0)
                    h_b.append(np.random.uniform(0,self.configuration.Hand_max))
                t.append(t_b)
                h.append(h_b)
            result.append(Solution(t,h))
        return result
    def recombination(self):
        # self.poblation
        (ri,r1,r2,r3)=tuple(np.random.choice(self.poblation,4,replace=False))
        (f,cr)=tuple(np.random.sample())
if __name__ == "__main__": 
    b1=Ball([Throw(3),Throw(1)],'b1')
    b2=Ball([Throw(1),Throw(2),Throw(1)],'b2')
    c=Configuration(0.7,[b1,b2],10,10,15,20,3,2)
    de = DifferentialEvolution(c,[1,2,4,5,6,7,8],10)
    for s in de.initialPopulation(10):
        print(de.configuration.model(s))

        