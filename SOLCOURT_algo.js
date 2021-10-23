class GrapheMatriceAdjacence{
    constructor(n){
        /*
        -> n (int) : taille de la matrice d'adjacence
        -> this.matAdj (list) : matrice d'adjacence
        */
        const dim = new Array(n).fill(0)
        this.matAdj = new Array(n).fill(dim)
    }
    ajouterArc(u,v,p){
        /* 
        l'arc entre les sommet u et v reçoit le poids "p"
        -> u (int) : sommet départ
        -> v (int) : sommet arrivée
        -> p (int) : poids de l'arc
        */
        this.matAdj[u][v]=p
    }
    listerSuccesseur(u){
        /* 
        donne les sommet adjacent à "u"
        -> u (int) : sommet
        <- succ (list) : sommets adjacents
        */
        var succ = []
        this.matAdj[u].forEach((value,i)=>{
            if(value!=0){
                succ.push([i,value])
            }
        })
        return succ
    }
}
// ESSAI GRAPHE MATRICE ADJACENCE
const prem = new GrapheMatriceAdjacence(3) // Matrice d'adjacence de taille 3
console.log(prem.matAdj)
prem.ajouterArc(1,2,1)// ajout d'un arc entre sommet 1 et 2 de poids 1
console.log(prem.matAdj)
console.log(prem.listerSuccesseur(1))// liste des successeur de 1
console.log(prem.matAdj)
class GrapheListeAdjacence{
    constructor(n){
        /*
        -> n (int) : taille du graphe 
        */
        var A=[]
        for (let index = 0; index < n; index++) {
            A.push([])
        }
        this.lisAdj=A
    } 
    ajouterArc(u,v,p){
          /* 
        l'arc entre les sommet u et v reçoit le poids "p"
        -> u (int) : sommet départ
        -> v (int) : sommet arrivée
        -> p (int) : poids de l'arc
        */
        console.log(u)
        this.lisAdj[u].push([v,p])
    }
    listerSuccesseur(u){
        /* 
        donne les sommet adjacent à "u"
        -> u (int) : sommet
        <- succ (list) : sommets adjacents
        */
        return(this.lisAdj[u])
    }
    isEmpty(){
        /*
        <- (bool) : la liste d'adjacence est vide
        */
        return this.lisAdj.length()==0
    }
}
// ESSAI GRAPHE LISTE ADJACENCE
const deux = new GrapheListeAdjacence(3)
console.log(deux.lisAdj)
deux.ajouterArc(1,1,1)
console.log(deux.lisAdj)
console.log(deux.listerSuccesseur(1))
console.log(deux.lisAdj) 
class File{//OK
    constructor(){
        this.file=[]
    }
    enfiler(x){
        /*
        ajoute un élément au début  de la liste
        -> x (type de l'élément) : élément à enfiler
        */
        this.file.push(x)
    }
    defiler(){
        /*
        retire l'élément à la fin de la liste
        <- (type de l'élément) élément à défiler
        */
        const a= this.file.shift()
        return(a)
    }
    isEmpty(){  
        /*
        <- (bool) : la liste d'adjacence est vide
        */
        return(this.file.length==0)
    }
}
// ESSAI FILE
const fle = new File()
fle.enfiler(5)
console.log(fle.file)
fle.enfiler(2)
console.log(fle.file)
console.log(fle.defiler())
console.log(fle.file)
console.log(fle.isEmpty())
class FileDeProrite{
    constructor(){
        this.file=[]
    }
    enfiler(x,p){
        //ajout d'un élément 
        /*
        ajoute un élément au début  de la liste
        -> x (type de l'élément) : élément à enfiler
        -> p (int) : poids de l'élément
        */ 
        this.file.push([x,p])
    }
    defiler(){
        //retirer l'élément de plus grande priorité
        /* 
        <- (type de l'élément) élément à défiler
        */
        var min = Infinity
        var index = 0
        this.file.forEach((value,i)=>{
            if(value[1]<min){
                min = value[1]
                index = i
            }
        })
        return this.file.splice(index,1)[0]//retire l'élément d'ince "index"
    }
    modifPrio(x,p){
        /*
        -> x (int) : indice de l'élément 
        -> p (int) : poids à modifier 
        */
        //change la priorité d'un élément
        var i=0
        while(this.file[i][0]!=x){
            //recherche de l'élémént "x"
            i=i+1
        }
        this.file[i][0] = p
    }
    isEmpty(){
        /*
        <- (bool) : la liste d'adjacence est vide
        */
        return this.file.length==0
    }

}
// ESSAI FILE DE PRIORITÉ
var F = new FileDeProrite()
F.enfiler(5,1)
console.log(F.file)
function parent(i){
    /*
    -> i (int) : index du fils
    <- (int) index du parent 
    */
    return Math.floor(i/2)
}
class TasDePriorite{
    constructor(){
        this.file=[]
    }
    enfiler(x,p){
        // ajout d'un élémént
        /* 
        -> x (type de l'élément) : élément à enfiler
        -> p (int) : priorité de l'élément
        */
        this.file.push([x,p])//ajout de l'élément à la file
        var indexAct=this.file.length//indie de l'élément actuel
        var indexParent=parent(indexAct)// récupération du parent de l'élément actuel
        while(p<this.file[indexParent][1]){// placement du nouvel élémént
            this.file[indexAct-1]=this.file[indexParent-1]
            this.file[indexParent] = [x,p]
            indexAct=indexParent
            indexParent = parent(indexAct)
        }
    }
    defiler(){
         //retirer l'élément de plus grande priorité
        /* 
        <- (type de l'élément) élément à défiler
        */
        var cond= false
        var indexAct= 1
        var indexSuiv
        var tmp
        const sortie = this.file[0]
        this.file[0] = this.file[this.length-1]//déplacement du dernier élément
        this.file.splice(this.length-1,1)//extraction de l'élément le plus prioritaire
        while(!cond){// déplacement des autres éléments suite à l'extraction de l'élément de plus haute priorité
            var filsGa = 2*indexAct
            var filsDr = 2*indexAct+1    
            if (filsDr-1<this.file.length){
                //
                if (this.file[indexAct-1][1]<=this.file[filsDr-1][1] && this.file[indexAct-1][1]<=this.file[filsGa-1][1]){
                    cond  = true
                }else if(this.file[filsGa-1][1]<=this.file[filsDr-1][1]){
                    indexSuiv = filsGa
                }else{
                    indexSuiv = filsDr
                }
            }else if(filsGa-1<this.file.length){
                if(this.file[indexAct]-1<=this.file[filsGa-1][1]){
                    cond = true
                }else{
                    indexSuiv = filsGa
                }
            }else{
                cond = true
            }
            if(!cond){
                tmp = this.file[indexAct-1]
                this.file[indexAct-1] = this.file[indexSuiv-1]
                this.file[indexSuiv-1] = tmp
            }               
        }
        return sortie
    }
    modifPrio(x,p){
        // changement d'une priorité
        /*
        -> x (int) : index de élément
        -> p (int) : nouvelle priorité
        */
        var indexAct = 0
        var i= 1
        this.file.forEach((value,c)=>{
            //recherche de l'élément à modifier
            if(value[0]==x){
                indexAct = i
            }else{
                i=i+1
            }
        })
        //application de la priorité
        this.file[indexAct][1]=p
        //indice du parent 
        var indexParent = parent(indexAct)
        while (p<this.file[indexParent][1]){
            //déplacement des éléments
            this.file[indexAct-1] = this.file[indexParent-1]
            this.file[indexParent-1] = [n,p]
            indexAct = indexParent
            indexParent = parent(indexAct)
        }
    }
    isEmpty(){
        return this.file.length==0
    }
}
// ESSAI TAS DE PRIORITÉ
var T = new TasDePriorite()
T.enfiler(1,1)
T.enfiler(1,1)
T.enfiler(1,1)
console.log(T.file)
console.log(T.defiler())
T.modifPrio(1,2)
console.log(T.file)
parcoursLargeur = function(G,s){
    /*
    -> G (graph) : Graph
    -> s (int) : indice du sommet de départ
    <- T (list) : distances entre les sommet
    <- pred (list) : chemin parcourus
    */
    var T=[]
    var F=File()
    var pred = new Array(G.length).fill(0)
    pred[s]=[]
    G.matAdj.forEach((value,i)=>{
        //remplissage des distances initiales
        if(value=s){
            T.push(Infinity) 
        }else{            
            T.push(0) 
        }        
        F.enfiler(T)
    })
    while(!F.isEmpty()){
        u = F.defiler()// défilement de l'élément
        //parcours du graph
        G.listerSuccesseur(u).forEach((value,i)=>{
            if(T[value[0]]==Infinity){//lorsque le sommet est inaccessible
                T[value[0]]=T[value]+1
                F.enfiler(value[0])// ajout du sommet à la file du chemin
                pred[value[0]]=u
            }
        })
    }
    return T,pred
}
mat = new GrapheMatriceAdjacence()
mat.creerGraph(3)
mat.ajouterArc(1,1,1)
const depart=new sommet(1,1)
parcoursLargeur(mat,depart) 
function djikstraFile(G,s){
     /*
    -> G (graph) : Graph
    -> s (int) : indice du sommet de départ
    <- T (list) : distances entre les sommet
    <- pred (list) : chemin parcourus
    */
    var T=[]
    var F=new FileDeProrite()
    pred = new Array(G.length).fill(0)
    pred[s]=[]
    G.lisAdj.forEach((value,i)=>{
        //remplissage des distances initiales
        if(i!=s){
            T.push(Infinity)
        }else{
            T.push(0)
        }
       
        F.enfiler(i,T[i])
    })
    while(!F.isEmpty()){//recherche jusqu'à trouver un chemin
        u = F.defiler() //élément de  poids le plus gd
        G.listerSuccesseur(u[0]).forEach((value,i)=>{
            if(T[value[0]]>T[u[0]]+value[1]){// si le successeur est inaccessible
                T[value[0]] = T[u[0]]+value[1]
                F.modifPrio(value[0],T[value[0]])//cettte distance est plus courte
                pred[value[0]]=u[0]
            }
        })
    }
    return [T,pred]
}
function djikstraTas(G,s){
     /*
    -> G (graph) : Graph
    -> s (int) : indice du sommet de départ
    <- T (list) : distances entre les sommet
    <- pred (list) : chemin parcourus
    */
    var T=[]
    var F=new TasDePriorite()
    pred = new Array(G.length).fill(0)
    pred[s]=[]
    G.lisAdj.forEach((value,i)=>{
        if(value!=s){
            T.push(Infinity)
        }else{
            T.push(0)
        }
        F.enfiler(value,T[value])
    })
    while(!F.isEmpty()){
        u = F.defiler()
        G.listerSuccesseur(u[0]).forEach((value,i)=>{
            if(T[value[0]]>T[u[0]]+value[1]){
                T[value[0]] = T[u[0]]+value[1]
                F.modifPrio(value[0],T[value[0]])
                pred[value[0]]=u[0]
            }
        })
    }
    return [T,pred]
}
test_L_p = new GrapheListeAdjacence(5) // création du graph
console.log(test_L_p.lisAdj)
test_L_p.ajouterArc(0, 1, 1)// définition du graph
test_L_p.ajouterArc(0, 2, 2)
test_L_p.ajouterArc(1, 3, 1)
test_L_p.ajouterArc(2, 4, 2)
test_L_p.ajouterArc(2, 4, 1)
console.log(test_L_p.lisAdj)
console.log(djikstraTas(test_L_p,0))
console.log(djikstraH(test_L_p,0))