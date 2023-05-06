SRC=MUL

.PHONY : clean

all : $(SRC).pdf 

%.pdf : %.tex 
	-pdflatex -shell-escape --interaction=nonstopmode $<
	-pdflatex -shell-escape --interaction=nonstopmode $<

clean :
	rm -r -f *.bbl *.blg *.cut *.aux *.log *.out *.pdf *.synctex.gz *~ _*

