SRC=MUL

.PHONY : clean html

all : $(SRC).pdf 

%.pdf : %.tex 
	pdflatex -shell-escape --interaction=nonstopmode $<
	pdflatex -shell-escape --interaction=nonstopmode $<

html :
	latex2html -no_navigation -split 0 $(SRC).tex

clean :
	rm -r -f *.bbl *.blg *.cut *.aux *.log *.out *.pdf *.synctex.gz *~ _*

