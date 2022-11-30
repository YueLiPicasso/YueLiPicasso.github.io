// LI YUE @ 29 NOV 2022 @ HAINAN, CHINA

// global counter for additional offenses and prior records
let ao_count = 0;
let ao_count_str = undefined; 
let pr_count = 0;
let pr_count_str = undefined; 
// commonly used strings
const brk_id_prefix = "BR_AFTER_";
const hrl_id_prefix = "HR_BEFORE_";
const label_id_prefix = "LABEL_OF_";
const label_text_suffix = " ";
const label_text_prefix = " ";
// interface text macros
const add_butt_text = "ADD";
const rm_butt_text = "REMOVE";
const race_text_B = "B";
const race_value_B = "B";
const race_text_W = "W";
const race_value_W = "W";
const race_text_O = "Other";
const race_value_O = "OTHER";
const gender_text_F = "F";
const gender_value_F = "F";
const gender_text_M = "M";
const gender_value_M = "M";
const pot_text_P = "Plea";
const pot_value_P = "PLEA";
const pot_text_T = "Trial";
const pot_value_T = "TRIAL";
const qualifier_text_A = "Attempt";
const qualifier_value_A = "A";
const qualifier_text_S = "Solicitation";
const qualifier_value_S = "S";
const qualifier_text_C = "Conspiracy";
const qualifier_value_C = "C";
const qualifier_text_R = "Reclassification";
const qualifier_value_R = "R";
const qualifier_text_N = "Not Applicable";
const qualifier_value_N = "NA";
const degree_text_FL = "Life F.";
const degree_value_FL = "FL";
const degree_text_F1 = "1st F.";
const degree_value_F1 = "F1";
const degree_text_F2 = "2nd F.";
const degree_value_F2 = "F2";
const degree_text_F3 = "3rd F.";
const degree_value_F3 = "F3";
const degree_text_M1 = "1st M.";
const degree_value_M1 = "M1";
const degree_text_M2 = "2nd M.";
const degree_value_M2 = "M2";
const total_text = "TOTAL";
const level_text = "OFFENSE LEVEL";
const desc_text = "DESCRIPTION";
const qual_text = "QUALIFIER";
const pnts_text = "POINTS";
const fsr_text = "F.S.#";
const cnts_text = "COUNTS";
const dokt_text = "DOCKET #";
const fmdg_text = "FEL\/MM DEGREE";
const legend_text = {
    preamble : "",
    po   : "I. PRIMARY OFFENSE",
    ao   : "II. ADDITIONAL OFFENSE(S)",
    vi   : "III. VICTIM INJURY",
    pr   : "IV. PRIOR RECORD",
    ls   : "V. Legal Status Violation = 4 Points",
    csv  : "VI. Community Sanction violation before the court for sentencing", 
    fa   : "VII.",
    pcsf : "VIII.",
    st   : "",
    eh   : "IX. Enhancements (only if the primary offense qualifies for enhancement)",
    tsp  : "",
    sc   : "SENTENCE COMPUTATION",
    tsi  : "TOTAL SENTENCE IMPOSED",
    mi   : "REASONS FOR DEPARTURE - MITIGATING CIRCUMSTANCES",
};
const l2p_text = {
    po : "(Level - Points: 1=4, 2=10, 3=16, 4=22, 5=28, 6=36, 7=56, 8=74, 9=92, 10=116)",
    ao : "(Level - Points: M=0.2, 1=0.7, 2=1.2, 3=2.4, 4=3.6, 5=5.4, 6=18, 7=28, 8=37, 9=46, 10=58)",
    pr : "(Level - Points: M=0.2, 1=0.5, 2=0.8, 3=1.6, 4=2.4, 5=3.6, 6=9, 7=14, 8=19, 9=23, 10=29)",
};
const sc_1_text = "If total sentence points are less than or equal to 44, the lowest permissible sentence is any non-state prison sanction . If the total sentence points are 22 points or less, see Section 775.082(10), Florida Statutes, to determine if the court must sentence the offender to a non-state prison sanction.";
const sc_2_text = "If total sentence points are greater than 44:";
const sc_3_text = "The maximum sentence is up to the statutory maximum for the primary and any additional offenses as provided in s. 775.082, F.S., unless the lowest permissible sentence under the Code exceeds the statutory maximum. Such sentences may be imposed concurrently or consecutively. If total sentence points are greater than or equal to 363, a life sentence may be imposed.";
const tsi_1_text = "Please check if sentenced as";
const mi_text = "Pursuant to 921.0026(3) the defendant’s substance abuse or addiction does not justify a downward departure from the lowest permissible sentence, except for the provisions of s. 921.0026(2)(m). Effective Date: For offenses committed under the Criminal Punishment Code effective for offenses committed on or after October 1, 1998 and subsequent revisions."
/*
  The ideas of namespaces and modules are used to organise the id's
  The name spaces are:

  - preamble (indicated by the post fix _PREAMBLE)
  - primary offense                    (_PO)
  - additional offenses                (_AO and _AOTOP)
  - victim injury                      (_VI)
  - prior record                       (_PR and _PRTOP)
  - legal status                       (_LS)
  - community sanction violation       (_CSV)
  - firearm                            (_FA)
  - prior captial/serious felony       (_PCSF)
  - subtotal sentence points           (_ST)
  - enhancements                       (_EH)
  - total sentense points              (_TSP)
  - sentence computation               (_SC)
  - total sentence imposed             (_TSI)
  - mitigating circum.                 (_MI)

  Each namespace is divided into two subspaces distinguished by the 
  prefixes:

  - fieldId_, and
  - fieldLabelText_

  The field_Id is used for input field "name" and "id" attributes.
*/
const fieldId_PREAMBLE = {
    cty : "CTY_PA",
    dc  : "DC_PA",
    dob : "DOB_PA",
    dos : "DOS_PA",
    gd  : "GD_PA",
    nm  : "NM_PA",
    rc  : "RC_PA",
    sj  : "SJ_PA",
    pdn : "PDN_PA",
    pn  : "PN_PA",
    pod : "POD_PA",
    pot : "POT_PA",
};
const fieldLabelText_PREAMBLE = {
    cty : "3. COUNTY" + label_text_suffix,
    dc  : "7. DC #"   + label_text_suffix,
    dob : "6. DOB"    + label_text_suffix,
    dos : "1. DATE OF SENTENCE"  + label_text_suffix,
    gd  : "9. GENDER"            + label_text_suffix,
    nm  : "5. NAME (LAST, FIRST, MI.I.)" + label_text_suffix,
    rc  : "8. RACE"              + label_text_suffix,
    sj  : "4. SENTENCING JUGDE"  + label_text_suffix,
    pdn : "11. PRIMARY DOCKET #"  + label_text_suffix,
    pn  : "2. PREPARER\'S NAME"  + label_text_suffix,
    pod : "10. PRIMARY OFF. DATE" + label_text_suffix,
    pot : "12. PLEA OR TRIAL"     + label_text_suffix,
};
const fieldId_PO = {
    qualifier   : "QU_PO",
    degree      : "FD_PO",
    fsr         : "FSR_PO",
    description : "DES_PO",
    level       : "OL_PO",
    points      : "PT_PO",
};
const fieldLabelText_PO = {
    qualifier   : qual_text  + label_text_suffix,
    degree      : "FELONY DEGREE" + label_text_suffix,
    fsr         : fsr_text   + label_text_suffix,
    description : desc_text  + label_text_suffix,
    level       : level_text + label_text_suffix,
    points      : pnts_text  + label_text_suffix,  
};
const fieldId_AOTOP = {
    total : "TT_AOTOP",
};
function fieldId_AO () {
    const ao_fieldId = {
	docket      : "DC_AO"  + ao_count_str,
	degree      : "DEG_AO" + ao_count_str,
	fsr         : "FSR_AO" + ao_count_str,
	level       : "OL_AO"  + ao_count_str,
	qualifier   : "QU_AO"  + ao_count_str,
	counts      : "CNT_AO" + ao_count_str,
	points      : "PNT_AO" + ao_count_str,
	total       : "TT_AO"  + ao_count_str,
	description : "DES_AO" + ao_count_str,
    };
    return ao_fieldId;
}
const fieldLabelText_AO = {
    docket      : dokt_text  + label_text_suffix,
    degree      : fmdg_text  + label_text_suffix,
    fsr         : fsr_text   + label_text_suffix,
    description : desc_text  + label_text_suffix,
    level       : level_text + label_text_suffix,
    qualifier   : qual_text  + label_text_suffix,
    counts      : cnts_text  + label_text_suffix,
    points      : pnts_text  + label_text_suffix,
    total       : total_text + label_text_suffix,
    topTotal    : total_text + label_text_suffix,
};
const fieldId_VI = {
    sec_murder_num : "SMN_VI",
    sec_murder_tol : "SMT_VI",
    death_num      : "DN_VI",
    death_tol      : "DT_VI",
    severe_num     : "SEN_VI",
    severe_tol     : "SET_VI",
    moderate_num   : "MON_VI",
    moderate_tol   : "MOT_VI",
    slight_num     : "SLN_VI",
    slight_tol     : "SLT_VI",
    xp_num         : "XPN_VI",
    xp_tol         : "XPT_VI",
    xc_num         : "XCN_VI",
    xc_tol         : "XCT_VI",
    topTotal       : "TT_VI",
};
const fieldLabelText_VI = {
    sec_murder_num : "2nd Degree Murder (number of)" + label_text_suffix,
    sec_murder_tol : label_text_prefix + "x 240 ="   + label_text_suffix,
    death_num      : "Death (number of)"             + label_text_suffix,
    death_tol      : label_text_prefix + "x 120 ="   + label_text_suffix,
    severe_num     : "Severe (number of)"            + label_text_suffix,
    severe_tol     : label_text_prefix + "x 40 ="    + label_text_suffix,
    moderate_num   : "Moderate (number of)"          + label_text_suffix,
    moderate_tol   : label_text_prefix + "x 18 ="    + label_text_suffix,
    slight_num     : "Slight (number of)"            + label_text_suffix,
    slight_tol     : label_text_prefix + "x 4 ="     + label_text_suffix,
    xp_num         : "Sex Penetration (number of)"   + label_text_suffix,
    xp_tol         : label_text_prefix + "x 80 ="    + label_text_suffix,
    xc_num         : "Sex Contact (number of)"       + label_text_suffix,
    xc_tol         : label_text_prefix + "x 40 ="    + label_text_suffix,
};
const fieldId_PRTOP = {
    total : "TT_PRTOP",
};
function fieldId_PR () {
    const pr_fieldId = {
	docket      : "DC_PR"  + pr_count_str,
	degree      : "DEG_PR" + pr_count_str,
	fsr         : "FSR_PR" + pr_count_str,
	level       : "OL_PR"  + pr_count_str,
	qualifier   : "QU_PR"  + pr_count_str,
	counts      : "CNT_PR" + pr_count_str,
	points      : "PNT_PR" + pr_count_str,
	total       : "TT_PR"  + pr_count_str,
	description : "DES_PR" + pr_count_str,
    };
    return pr_fieldId;
}
const fieldLabelText_PR = {
    docket      : dokt_text  + label_text_suffix,
    degree      : fmdg_text  + label_text_suffix,
    fsr         : fsr_text   + label_text_suffix,
    description : desc_text  + label_text_suffix,
    level       : level_text + label_text_suffix,
    qualifier   : qual_text  + label_text_suffix,
    counts      : cnts_text  + label_text_suffix,
    points      : pnts_text  + label_text_suffix,
    total       : total_text + label_text_suffix,
    topTotal    : total_text + label_text_suffix,
};
const fieldId_LS = {
    total : "TT_LS",
    es    : "ES_LS",
    fl    : "FL_LS",
    fp    : "FP_LS",
    sb    : "SB_LS",
    ic    : "IC_LS",
    pid   : "PID_LS",
    cs    : "CS_LS",
};
const fieldLabelText_LS = {
    total : total_text + label_text_suffix,
    es    : "Escape",
    fl    : "Fleeing",
    fp    : "Failure to appear",
    sb    : "Supersedeas bond",
    ic    : "Incarceration",
    pid   : "Pretrial intervention or diversion program",
    cs    : "Court imposed or post prison release community supervision resulting in a conviction",
};
const fieldId_CSV = {
    tp   : "TP_CSV",  // t for type
    tcc  : "TCC_CSV",
    tpid : "TPID_CSV",
    csix : "CSIX_CSV", // c for checkbox
    cnf  : "CNF_CSV",  // nf for new felony
    ctw  : "CTW_CSV",  // tw for twelve
    ctf  : "CTF_CSV",  // tf for twenty four
    six  : "SIX_CSV", 
    nf   : "NF_CSV",
    tw   : "TW_CSV",
    tf   : "TF_CSV",
    total   : "TT_CSV",
};
const fieldLabelText_CSV = {
    total : total_text,
    tp   : "Probation",
    tcc  : "Community Control",
    tpid : "Pretrial Intervention or diversion",
    csix : "6 points for any violation other than new felony conviction x" + label_text_suffix,
    cnf  : "New felony conviction = 12 points x" + label_text_suffix,
    ctw  : "12 points x" + label_text_suffix,
    ctf  : "New felony conviction = 24 points x" + label_text_suffix,
    six  : label_text_prefix + "each successive violation OR",
    nf   : label_text_prefix + "each successive violation if new offense results in conviction before or at same time as sentence for violation of probation OR",
    tw   : label_text_prefix + "each successive violation for a violent felony offender of special concern when the violation is not based solely on failure to pay costs, fines, or restitution OR",
    tf   : label_text_prefix + "each successive violation for a violent felony offender of special concern if new offense results in a conviction before or at the same time for violation of probation",
};
const fieldId_FA = {
    total : "TT_FA",
};
const fieldLabelText_FA = {
    total : "Firearm\/Semi-Automatic or Machine Gun = 18 or 25 Points" + label_text_suffix,
};
const fieldId_PCSF = {
    pcap : "C_PCSF",
    pser : "S_PCSF",
};
const fieldLabelText_PCSF = {
    pcap : "Prior capital felony - 2 x (Primary + Add. Off. Points)" + label_text_suffix,
    pser : "Prior serious felony - 30 Points" + label_text_suffix,
};
const fieldId_ST = {
    total : "TT_ST",
};
const fieldLabelText_ST = {
    total : "Subtotal Sentence Points" + label_text_suffix,
};
const fieldId_EH = {
    total : "TT_EH",
    lep1  : "LEP1_EH",
    lep2  : "LEP2_EH",
    lep3  : "LEP3_EH",
    dt    : "DT_EH",
    mvt   : "MVT_EH",
    cgo   : "CGO_EH",
    dv    : "DV_EH",
    so    : "SO_EH",
};
const fieldLabelText_EH = {
    total : "Enhanced Subtotal Sentence Points" + label_text_suffix,
    lep1  : "x 1.5 Law Enf. Protect.",
    lep2  : "x 2.0 Law Enf. Protect.",
    lep3  : "x 2.5 Law Enf. Protect.",
    dt    : "x 1.5 Drug Trafficker",
    mvt   : "x 1.5 Motor Vehicle Theft",
    cgo   : "x 1.5 Criminal Gang Offense",
    dv    : "x 1.5 Domestic Violence in the Presence of Related Child (offenses committed on or after 3/12/07)",
    so    : "x 2.0 Adult-on-Minor Sex Offense (offenses committed on or after 10/1/14)",
};
const fieldId_TSP = {
    total : "TT_TSP",
};
const fieldLabelText_TSP = {
    total : "TOTAL SENTENCE POINTS" + label_text_suffix,
};
const fieldId_SC = {
    tsp  : "TT_SC",
    m28  : "M28_SC",
    td75 : "TD75_SC",
    mx   : "MX_SC",
};
const fieldLabelText_SC = {
    tsp  : "Total Sentence Points" + label_text_suffix,
    m28  : label_text_prefix + "minus 28 =" + label_text_suffix,
    td75 : label_text_prefix + "x .75 =" + label_text_suffix,
    td75post : label_text_prefix + "Lowest Permissible Prison Sentence in Months",
    mx   : "Maximum Sentence in Years" + label_text_suffix,
};
const fieldId_TSI = {
    check_sp : "CHECK_SP_TSI",
    check_lf : "CHECK_LF_TSI",
    check_cj : "CHECK_CJ_TSI",
    check_ts : "CHECK_TS_TSI",
    check_cc : "CHECK_CC_TSI",
    check_pr : "CHECK_PR_TSI",
    check_md : "CHECK_MD_TSI",
    check_ho : "CHECK_HO_TSI",
    check_hv : "CHECK_HV_TSI",
    check_vc : "CHECK_VC_TSI",
    check_ro : "CHECK_RO_TSI",
    check_mm : "CHECK_MM_TSI",
    check_mi : "CHECK_MI_TSI",
    check_pb : "CHECK_PB_TSI",
    check_pd : "CHECK_PD_TSI",
    years_r1 : "Y11_TSI",
    years_r2 : "Y2_TSI",
    years_r3 : "Y3_TSI",
    years_r4 : "Y4_TSI",
    month_r1 : "M1_TSI",
    month_r2 : "M2_TSI",
    month_r3 : "M3_TSI",
    month_r4 : "M4_TSI",
    days_r1 : "D1_TSI",
    days_r2 : "D2_TSI",
    days_r3 : "D3_TSI",
    days_r4 : "D4_TSI",
    other   : "OTHER_TSI",
};
const fieldLabelText_TSI = {
    check_sp : "State Prison",
    check_lf : "Life",
    check_cj : "County Jail",
    check_ts : "Time Served",
    check_cc : "Community Control",
    check_pr : "Probation",
    check_md : "Modified",
    check_ho : "habitual offender,",
    check_hv : "habitual violent offender,",
    check_vc : "violent career criminal,",
    check_ro : "prison releasee reoffender, or a",
    check_mm : "mandatory minimum applies.",
    check_mi : "Mitigated Departure",
    check_pb : "Plea Bargain",
    check_pd : "Prison Diversion Program",
    years_r1 : "Years",
    years_r2 : "Years",
    years_r3 : "Years",
    years_r4 : "Years",
    month_r1 : "Months",
    month_r2 : "Months",
    month_r3 : "Months",
    month_r4 : "Months",
    days_r1 : "Days",
    days_r2 : "Days",
    days_r3 : "Days",
    days_r4 : "Days",
    other   : "Other Reason",
};
const fieldId_MI = {
    r1 : "R1_MI",
    r2 : "R2_MI",
    r3 : "R3_MI",
    r4 : "R4_MI",
    r5 : "R5_MI",
    r6 : "R6_MI",
    r7 : "R7_MI",
    r8 : "R8_MI",
    r9 : "R9_MI",
    r10 : "R10_MI",
    r11 : "R11_MI",
    r12 : "R12_MI",
    r13 : "R13_MI",
    r14 : "R14_MI",
};
const fieldLabelText_MI = {
    r1 : "Legitimate, uncoerced plea bargain.",
    r2 : "The defendant was an accomplice to the offense and was a relatively minor participant in the criminal conduct.",
    r3 : "The capacity of the defendant to appreciate the criminal nature of the conduct or to conform that conduct to the requirements of law was substantially impaired.",
    r4 : "The defendant requires specialized treatment for a mental disorder that is unrelated to substance abuse or addiction, or for a physical disability, and the defendant is amenable to treatment.",
    r5 : "The need for payment of restitution to the victim outweighs the need for a prison sentence.",
    r6 : "The victim was an initiator, willing participant, aggressor, or provoker of the incident.",
    r7 : "The defendant acted under extreme duress or under the domination of another person.",
    r8 : "Before the identity of the defendant was determined, the victim was substantially compensated.",
    r9 : "The defendant cooperated with the State to resolve the current offense or any other offense.",
    r10 : "The offense was committed in an unsophisticated manner and was an isolated incident for which the defendant has shown remorse.",
    r11 : "At the time of the offense the defendant was too young to appreciate the consequences of the offense.",
    r12 : "The defendant is to be sentenced as a youthful offender.",
    r13 :  "The defendant is amenable to the services of a postadjudicatory treatment-based drug court program and is otherwise qualified to participate in the program.",
    r14 : "The defendant was making a good faith effort to obtain or provide medical assistance for an individual experiencing a drug-related overdose.",
};
// fieldset element assess
const pa_top  = document.getElementById("PREAMBLE");   // preamble container
const po_top  = document.getElementById("PO");     // primary offense container
const ao_top  = document.getElementById("AO");     // additional offense container
const vi_top  = document.getElementById("VI");     // victim injury container
const pr_top  = document.getElementById("PR");     // prior record container
const ls_top  = document.getElementById("LS");     // legal status container
const csv_top = document.getElementById("CSV");    // com. sanc. violation container
const fa_top  = document.getElementById("FA");     // firearm points container
const pcs_top = document.getElementById("PCSF");   // prior captital and serious felony container
const st_top  = document.getElementById("ST");     // Subtotal Sentence Points container
const eh_top  = document.getElementById("EH");     // enhancements container
const tsp_top = document.getElementById("TSP");    // total sentense points container
const sc_top  = document.getElementById("SC");     // sentense computation container
const tsi_top  = document.getElementById("TSI");   // total sentense imposed container
const mi_top  = document.getElementById("MI");     // mitigating circum. container

// utilities
function style_input_field(param) {
    const val =
	  "border:none;" +
	  "border-bottom:1px solid;" +
	  "background-color:white;" +
	  "padding:4px 0px;" +
	  "margin:2px;";
    param.setAttribute("style",val);
}
function style_input_button(param) {
    const val =
	  "cursor:pointer;" +
	  "border:none;" +
	  "background-color:grey;" +
	  "color:white;" +
	  "font-weight:bold;" +
	  "padding:4px 8px;" +
	  "margin:2px 0;" +
	  "border:1px solid;";
    param.setAttribute("style",val)
}
function style_checkbox(param) {
    param.setAttribute("style","margin:6px;");
}
function new_br(param) {
    const brk = document.createElement("br");
    brk.id = brk_id_prefix + param;
    return brk;
}
function new_hr(param) {
    const hrl = document.createElement("hr");
    hrl.id = hrl_id_prefix + param;
    hrl.setAttribute("style", "border-width:1px;border-style:dashed;");
    return hrl;
}
function new_emsp(top) {
    const spc = document.createElement("span");
    spc.innerHTML = "&emsp;"
    top.appendChild(spc);
}
function new_nbsp(top) {
    const spc = document.createElement("span");
    spc.innerHTML = "&nbsp;"
    top.appendChild(spc);
}
function insert_field_label(pElem,fieldId,labelText,delim) {
    const field_label = document.createElement("label");
    const labId = label_id_prefix + fieldId;
    field_label.setAttribute("for",fieldId);
    field_label.setAttribute("id",labId);
    field_label.innerText = labelText;
    pElem.appendChild(field_label);
    if (delim == "hr") {
	field_label.insertAdjacentElement("beforebegin",new_hr(labId));
    }
    if (delim == "br") {
	field_label.insertAdjacentElement("afterend",new_br(labId));
    } 
}
function insert_checkbox(pElem,fId,labelText) {
    const field = document.createElement("input");
    const labId = label_id_prefix + fId;
    field.setAttribute("type","checkbox");
    field.setAttribute("id",fId);
    field.setAttribute("name",fId);
    style_checkbox(field);
    pElem.appendChild(field);
    const field_label = document.createElement("label");
    field_label.setAttribute("for",fId);
    field_label.setAttribute("id",labId);
    field_label.innerText = labelText;
    pElem.appendChild(field_label);
    field_label.insertAdjacentElement("afterend",new_br(labId));
}
// no break version
function insert_checkbox_NB(pElem,fId,labelText) {
    const field = document.createElement("input");
    const labId = label_id_prefix + fId;
    field.setAttribute("type","checkbox");
    field.setAttribute("id",fId);
    field.setAttribute("name",fId);
    style_checkbox(field);
    pElem.appendChild(field);
    const field_label = document.createElement("label");
    field_label.setAttribute("for",fId);
    field_label.setAttribute("id",labId);
    field_label.innerText = labelText;
    pElem.appendChild(field_label);
}
function insert_text_field(pElem,fId) {
    const field = document.createElement("input");
    field.setAttribute("type","text");
    field.setAttribute("id",fId);
    field.setAttribute("name",fId);
    style_input_field(field);
    pElem.appendChild(field);
    field.insertAdjacentElement("afterend",new_br(fId));
}
// not ending with line break
function insert_text_field_NB(pElem,fId) {
    const field = document.createElement("input");
    field.setAttribute("type","text");
    field.setAttribute("id",fId);
    field.setAttribute("name",fId);
    style_input_field(field);
    pElem.appendChild(field);
}
function insert_dropdown(pElem,fId) {
    const field = document.createElement("select");
    field.setAttribute("id",fId);
    field.setAttribute("name",fId);
    style_input_field(field);
    pElem.appendChild(field);
    field.insertAdjacentElement("afterend",new_br(fId));
    return field;
}
function insert_option(val,txt,sel,pElem) {
    const op = document.createElement("option");
    op.setAttribute("value",val);
    op.innerText = txt;
    if (sel == "selected") {
	op.setAttribute("selected","selected");
    }
    pElem.appendChild(op);
}
function insert_date_input(pElem,fId) {
    const field = document.createElement("input");
    field.setAttribute("type","date");
    field.setAttribute("id",fId);
    field.setAttribute("name",fId);
    style_input_field(field);
    pElem.appendChild(field);
    field.insertAdjacentElement("afterend",new_br(fId));
}
function insert_legend (pElem, labelText) {
    const lgd = document.createElement("legend");
    lgd.innerText = labelText;
    pElem.appendChild(lgd);
}
function insert_span (pElem, text) {
    const pg = document.createElement("span");
    pg.innerText = text;
    pElem.appendChild(pg);
}
function remove_field_and_associates(fieldId,delim) {
    document.getElementById(fieldId).remove();
    document.getElementById(label_id_prefix + fieldId).remove();
    document.getElementById(brk_id_prefix + fieldId).remove();
    if (delim == "hr") {
	document.getElementById(hrl_id_prefix + label_id_prefix + fieldId).remove();
    }
}
// fieldset builders
function preamble () {
    insert_legend(pa_top,legend_text.preamble);
    insert_field_label(pa_top,fieldId_PREAMBLE.dos,fieldLabelText_PREAMBLE.dos,"");
    insert_date_input(pa_top,fieldId_PREAMBLE.dos);   
    insert_field_label(pa_top,fieldId_PREAMBLE.pn,fieldLabelText_PREAMBLE.pn,"");
    insert_text_field(pa_top,fieldId_PREAMBLE.pn);
    insert_field_label(pa_top,fieldId_PREAMBLE.cty,fieldLabelText_PREAMBLE.cty,"");
    insert_text_field(pa_top,fieldId_PREAMBLE.cty);
    insert_field_label(pa_top,fieldId_PREAMBLE.sj,fieldLabelText_PREAMBLE.sj,"");
    insert_text_field(pa_top,fieldId_PREAMBLE.sj);
    insert_field_label(pa_top,fieldId_PREAMBLE.nm,fieldLabelText_PREAMBLE.nm,"");
    insert_text_field(pa_top,fieldId_PREAMBLE.nm);
    insert_field_label(pa_top,fieldId_PREAMBLE.dob,fieldLabelText_PREAMBLE.dob,"");
    insert_date_input(pa_top,fieldId_PREAMBLE.dob);
    insert_field_label(pa_top,fieldId_PREAMBLE.dc,fieldLabelText_PREAMBLE.dc,"");
    insert_text_field(pa_top,fieldId_PREAMBLE.dc);
    insert_field_label(pa_top,fieldId_PREAMBLE.rc,fieldLabelText_PREAMBLE.rc,"");
    const race_field = insert_dropdown(pa_top,fieldId_PREAMBLE.rc);
    insert_option(race_value_B,race_text_B,"",race_field);
    insert_option(race_value_W,race_text_W,"",race_field);
    insert_option(race_value_O,race_text_O,"selected",race_field);
    insert_field_label(pa_top,fieldId_PREAMBLE.gd,fieldLabelText_PREAMBLE.gd,"");
    const gender_field = insert_dropdown(pa_top,fieldId_PREAMBLE.gd);
    insert_option(gender_value_M,gender_text_M,"",gender_field);
    insert_option(gender_value_F,gender_text_F,"",gender_field);
    insert_field_label(pa_top,fieldId_PREAMBLE.pod,fieldLabelText_PREAMBLE.pod,"");
    insert_date_input(pa_top,fieldId_PREAMBLE.pod);
    insert_field_label(pa_top,fieldId_PREAMBLE.pdn,fieldLabelText_PREAMBLE.pdn,"");
    insert_text_field(pa_top,fieldId_PREAMBLE.pdn);
    insert_field_label(pa_top,fieldId_PREAMBLE.pot,fieldLabelText_PREAMBLE.pot,"");
    const pot_field = insert_dropdown(pa_top,fieldId_PREAMBLE.pot);
    insert_option(pot_value_P,pot_text_P,"",pot_field);
    insert_option(pot_value_T,pot_text_T,"",pot_field);
}
function primary_off () {
    insert_legend(po_top,legend_text.po);
    // qualifier
    insert_field_label(po_top,fieldId_PO.qualifier,fieldLabelText_PO.qualifier,"");
    const qualifier_field_PO = insert_dropdown(po_top,fieldId_PO.qualifier);
    insert_option(qualifier_value_A,qualifier_text_A,"",qualifier_field_PO);
    insert_option(qualifier_value_S,qualifier_text_S,"",qualifier_field_PO);
    insert_option(qualifier_value_C,qualifier_text_C,"",qualifier_field_PO);
    insert_option(qualifier_value_R,qualifier_text_R,"",qualifier_field_PO);
    insert_option(qualifier_value_N,qualifier_text_N,"selected",qualifier_field_PO);
    // degree
    insert_field_label(po_top,fieldId_PO.degree,fieldLabelText_PO.degree,"");
    const degree_field_PO = insert_dropdown(po_top,fieldId_PO.degree);
    insert_option(degree_value_FL,degree_text_FL,"",degree_field_PO);
    insert_option(degree_value_F1,degree_text_F1,"",degree_field_PO);
    insert_option(degree_value_F2,degree_text_F2,"",degree_field_PO);
    insert_option(degree_value_F3,degree_text_F3,"selected",degree_field_PO);
    // Florida statute reference
    insert_field_label(po_top,fieldId_PO.fsr,fieldLabelText_PO.fsr,"");
    insert_text_field(po_top,fieldId_PO.fsr);
    // description
    insert_field_label(po_top,fieldId_PO.description,fieldLabelText_PO.description,"");
    insert_text_field(po_top,fieldId_PO.description);
    // offense level
    insert_field_label(po_top,fieldId_PO.level,fieldLabelText_PO.level,"");
    const level_field_PO = insert_dropdown(po_top,fieldId_PO.level);
    insert_option("1","1","",level_field_PO);
    insert_option("2","2","",level_field_PO);
    insert_option("3","3","",level_field_PO);
    insert_option("4","4","",level_field_PO);
    insert_option("5","5","",level_field_PO);
    insert_option("6","6","",level_field_PO);
    insert_option("7","7","",level_field_PO);
    insert_option("8","8","",level_field_PO);
    insert_option("9","9","",level_field_PO);
    insert_option("10","10","",level_field_PO);
    // points for one count of the primary offense
    insert_field_label(po_top,fieldId_PO.points,fieldLabelText_PO.points,"");
    insert_text_field(po_top,fieldId_PO.points);
    // text note
    insert_span(po_top,l2p_text.po);
}
function additional_off () {
    insert_legend(ao_top,legend_text.ao);
    // total for all A.O.
    insert_field_label(ao_top,fieldId_AOTOP.total,fieldLabelText_AO.topTotal,"");
    insert_text_field_NB(ao_top,fieldId_AOTOP.total);

    new_emsp(ao_top);
    
    const add_butt = document.createElement("input");
    add_butt.setAttribute("type","button");
    add_butt.setAttribute("value",add_butt_text);
    add_butt.setAttribute("onclick","add_AOP(\"AO\")");
    style_input_button(add_butt);
    ao_top.appendChild(add_butt);

    new_emsp(ao_top);
    
    const rm_butt = document.createElement("input");
    rm_butt.setAttribute("type","button");
    rm_butt.setAttribute("value",rm_butt_text);
    rm_butt.setAttribute("onclick","remove_AOP(\"AO\")");
    style_input_button(rm_butt);
    ao_top.appendChild(rm_butt);

    new_emsp(ao_top);
    // text note
    insert_span(ao_top,l2p_text.ao);
}
function victim_injury () {
    insert_legend(vi_top,legend_text.vi);
    
    insert_field_label(vi_top,fieldId_VI.sec_murder_num,fieldLabelText_VI.sec_murder_num,"");
    insert_text_field_NB(vi_top,fieldId_VI.sec_murder_num);    
    insert_field_label(vi_top,fieldId_VI.sec_murder_tol,fieldLabelText_VI.sec_murder_tol,"");
    insert_text_field(vi_top,fieldId_VI.sec_murder_tol);
    
    insert_field_label(vi_top,fieldId_VI.death_num,fieldLabelText_VI.death_num,"");
    insert_text_field_NB(vi_top,fieldId_VI.death_num);
    insert_field_label(vi_top,fieldId_VI.death_tol,fieldLabelText_VI.death_tol,"");
    insert_text_field(vi_top,fieldId_VI.death_tol);

    insert_field_label(vi_top,fieldId_VI.severe_num,fieldLabelText_VI.severe_num,"");
    insert_text_field_NB(vi_top,fieldId_VI.severe_num);
    insert_field_label(vi_top,fieldId_VI.severe_tol,fieldLabelText_VI.severe_tol,"");
    insert_text_field(vi_top,fieldId_VI.severe_tol);

    insert_field_label(vi_top,fieldId_VI.moderate_num,fieldLabelText_VI.moderate_num,"");
    insert_text_field_NB(vi_top,fieldId_VI.moderate_num);
    insert_field_label(vi_top,fieldId_VI.moderate_tol,fieldLabelText_VI.moderate_tol,"");
    insert_text_field(vi_top,fieldId_VI.moderate_tol);

    insert_field_label(vi_top,fieldId_VI.slight_num,fieldLabelText_VI.slight_num,"");
    insert_text_field_NB(vi_top,fieldId_VI.slight_num);
    insert_field_label(vi_top,fieldId_VI.slight_tol,fieldLabelText_VI.slight_tol,"");
    insert_text_field(vi_top,fieldId_VI.slight_tol);

    insert_field_label(vi_top,fieldId_VI.xp_num,fieldLabelText_VI.xp_num,"");
    insert_text_field_NB(vi_top,fieldId_VI.xp_num);
    insert_field_label(vi_top,fieldId_VI.xp_tol,fieldLabelText_VI.xp_tol,"");
    insert_text_field(vi_top,fieldId_VI.xp_tol);

    insert_field_label(vi_top,fieldId_VI.xc_num,fieldLabelText_VI.xc_num,"");
    insert_text_field_NB(vi_top,fieldId_VI.xc_num);
    insert_field_label(vi_top,fieldId_VI.xc_tol,fieldLabelText_VI.xc_tol,"");
    insert_text_field(vi_top,fieldId_VI.xc_tol);

    // total for victim injury
    insert_field_label(vi_top,fieldId_VI.topTotal,total_text + label_text_suffix,"");
    insert_text_field(vi_top,fieldId_VI.topTotal);
}
function prior_record () {
    insert_legend(pr_top,legend_text.pr);
    // total for all P.R.
    insert_field_label(pr_top,fieldId_PRTOP.total,fieldLabelText_PR.topTotal,"");
    insert_text_field_NB(pr_top,fieldId_PRTOP.total);

    new_emsp(pr_top);
    
    const add_butt = document.createElement("input");
    add_butt.setAttribute("type","button");
    add_butt.setAttribute("value",add_butt_text);
    add_butt.setAttribute("onclick","add_AOP(\"PR\")");
    style_input_button(add_butt);
    pr_top.appendChild(add_butt);
    
    new_emsp(pr_top);
    
    const rm_butt = document.createElement("input");
    rm_butt.setAttribute("type","button");
    rm_butt.setAttribute("value",rm_butt_text);
    rm_butt.setAttribute("onclick","remove_AOP(\"PR\")");
    style_input_button(rm_butt);
    pr_top.appendChild(rm_butt);

    new_emsp(pr_top);
    // text note
    insert_span(pr_top,l2p_text.pr);
}
// AOP stands for Additional offense Or Prior record
function add_AOP(param) {
    let fieldId = undefined;
    let top = undefined;
    let label = undefined;
    
    if (param == "AO") {
	ao_count += 1;
	ao_count_str = ao_count.toString();
	fieldId = fieldId_AO ();
	top = ao_top;
	label = fieldLabelText_AO;
    } else if (param == "PR") {
	pr_count += 1;
	pr_count_str = pr_count.toString();
	fieldId = fieldId_PR ();
	top = pr_top;
	label = fieldLabelText_PR;
    }    
    // create short names
    const docket = fieldId.docket;
    const degree = fieldId.degree;
    const fsr = fieldId.fsr;
    const level = fieldId.level;
    const qualifier = fieldId.qualifier;
    const counts = fieldId.counts;
    const points = fieldId.points;
    const total = fieldId.total;
    const description = fieldId.description;

    // create and add fields
    // docket
    insert_field_label(top,docket,label.docket,"hr");
    insert_text_field(top,docket);
    // degree
    insert_field_label(top,degree,label.degree,"");
    const degree_field = insert_dropdown(top,degree);
    insert_option(degree_value_FL,degree_text_FL,"",degree_field);
    insert_option(degree_value_F1,degree_text_F1,"",degree_field);
    insert_option(degree_value_F2,degree_text_F2,"",degree_field);
    insert_option(degree_value_F3,degree_text_F3,"selected",degree_field);
    insert_option(degree_value_M1,degree_text_M1,"",degree_field);
    insert_option(degree_value_M2,degree_text_M2,"",degree_field);
    // Florida statute reference
    insert_field_label(top,fsr,label.fsr,"");
    insert_text_field(top,fsr);
    // description
    insert_field_label(top,description,label.description,"");
    insert_text_field(top,description);
    // offense level
    insert_field_label(top,level,label.level,"");
    const level_field = insert_dropdown(top,level);
    insert_option("1","1","",level_field);
    insert_option("2","2","",level_field);
    insert_option("3","3","",level_field);
    insert_option("4","4","",level_field);
    insert_option("5","5","",level_field);
    insert_option("6","6","",level_field);
    insert_option("7","7","",level_field);
    insert_option("8","8","",level_field);
    insert_option("9","9","",level_field);
    insert_option("10","10","",level_field);
    insert_option("M","M","",level_field);
    // qualifier
    insert_field_label(top,qualifier,label.qualifier,"");
    const qualifier_field = insert_dropdown(top,qualifier);
    insert_option(qualifier_value_A,qualifier_text_A,"",qualifier_field);
    insert_option(qualifier_value_S,qualifier_text_S,"",qualifier_field);
    insert_option(qualifier_value_C,qualifier_text_C,"",qualifier_field);
    insert_option(qualifier_value_R,qualifier_text_R,"",qualifier_field);
    insert_option(qualifier_value_N,qualifier_text_N,"selected",qualifier_field);
    // counts
    insert_field_label(top,counts,label.counts,"");
    insert_text_field(top,counts);
    // points for one count of the additional offense
    insert_field_label(top,points,label.points,"");
    insert_text_field(top,points);
    // total points of the additional offense
    insert_field_label(top,total,label.total,"");
    insert_text_field(top,total);
}
function remove_AOP(param) {
    let fieldId = undefined;
    let count = undefined;
    if (param == "AO") {
	fieldId = fieldId_AO();
	count = ao_count;
    } else if (param == "PR") {
	fieldId = fieldId_PR();
	count = pr_count;
    }
    // exactly remove what was added by the last add-button click,
    // ... including the all fields, their labels and associated linebreaks and horizontal rules.
    if (count > 0) {
	remove_field_and_associates(fieldId.docket,"hr");
	remove_field_and_associates(fieldId.degree,"");
	remove_field_and_associates(fieldId.fsr,"");
	remove_field_and_associates(fieldId.level,"");
	remove_field_and_associates(fieldId.qualifier,"");
	remove_field_and_associates(fieldId.counts,"");
	remove_field_and_associates(fieldId.points,"");
	remove_field_and_associates(fieldId.total,"");
	remove_field_and_associates(fieldId.description,"");
	// the interal numbering of additional offenses are regulated, 
	// i.e., always 1,2,3...
	if (param == "AO") {
	    ao_count = count - 1;
	    ao_count_str = ao_count.toString();
	} else if (param == "PR") {
	    pr_count = count - 1;
	    pr_count_str = pr_count.toString();
	}
    }
}
function legal_status () {
    insert_legend(ls_top,legend_text.ls);
    insert_checkbox(ls_top,fieldId_LS.es,fieldLabelText_LS.es);
    insert_checkbox(ls_top,fieldId_LS.fl,fieldLabelText_LS.fl);
    insert_checkbox(ls_top,fieldId_LS.fp,fieldLabelText_LS.fp);
    insert_checkbox(ls_top,fieldId_LS.sb,fieldLabelText_LS.sb);
    insert_checkbox(ls_top,fieldId_LS.ic,fieldLabelText_LS.ic);
    insert_checkbox(ls_top,fieldId_LS.pid,fieldLabelText_LS.pid);
    insert_checkbox(ls_top,fieldId_LS.cs,fieldLabelText_LS.cs);
    insert_field_label(ls_top,fieldId_LS.total,fieldLabelText_LS.total,"");
    insert_text_field(ls_top,fieldId_LS.total);
}
function cs_violation () {
    insert_legend(csv_top,legend_text.csv);
    new_emsp(csv_top);
    insert_checkbox_NB(csv_top,fieldId_CSV.tp,fieldLabelText_CSV.tp);
    new_emsp(csv_top);
    insert_checkbox_NB(csv_top,fieldId_CSV.tcc,fieldLabelText_CSV.tcc);
    new_emsp(csv_top);
    insert_checkbox(csv_top,fieldId_CSV.tpid,fieldLabelText_CSV.tpid);
      
    insert_checkbox_NB(csv_top,fieldId_CSV.csix,fieldLabelText_CSV.csix);
    insert_text_field_NB(csv_top,fieldId_CSV.six);
    insert_field_label(csv_top,fieldId_CSV.six,fieldLabelText_CSV.six,"br");
    
    insert_checkbox_NB(csv_top,fieldId_CSV.cnf,fieldLabelText_CSV.cnf);
    insert_text_field_NB(csv_top,fieldId_CSV.nf);
    insert_field_label(csv_top,fieldId_CSV.nf,fieldLabelText_CSV.nf,"br");
    
    insert_checkbox_NB(csv_top,fieldId_CSV.ctw,fieldLabelText_CSV.ctw);
    insert_text_field_NB(csv_top,fieldId_CSV.tw);
    insert_field_label(csv_top,fieldId_CSV.tw,fieldLabelText_CSV.tw,"br");
    
    insert_checkbox_NB(csv_top,fieldId_CSV.ctf,fieldLabelText_CSV.ctf);
    insert_text_field_NB(csv_top,fieldId_CSV.tf);
    insert_field_label(csv_top,fieldId_CSV.tf,fieldLabelText_CSV.tf,"br");

    insert_field_label(csv_top,fieldId_CSV.total,fieldLabelText_CSV.total,"");
    insert_text_field(csv_top,fieldId_CSV.total);
}
function firearm () {
    insert_legend(fa_top,legend_text.fa);
    insert_field_label(fa_top,fieldId_FA.total,fieldLabelText_FA.total,"");
    insert_text_field(fa_top,fieldId_FA.total);
}
function prior_cs_felony () {
    insert_legend(pcs_top,legend_text.pcsf);
    insert_field_label(pcs_top,fieldId_PCSF.pcap,fieldLabelText_PCSF.pcap,"");
    insert_text_field(pcs_top,fieldId_PCSF.pcap);
    insert_field_label(pcs_top,fieldId_PCSF.pser,fieldLabelText_PCSF.pser,"");
    insert_text_field(pcs_top,fieldId_PCSF.pser); 
}
function subtotal_points () {
    insert_legend(st_top,legend_text.st);
    insert_field_label(st_top,fieldId_ST.total,fieldLabelText_ST.total,"");
    insert_text_field(st_top,fieldId_ST.total); 
}
function enhancements () {
    insert_legend(eh_top,legend_text.eh);
    insert_checkbox(eh_top,fieldId_EH.lep1,fieldLabelText_EH.lep1);
    insert_checkbox(eh_top,fieldId_EH.lep2,fieldLabelText_EH.lep2);
    insert_checkbox(eh_top,fieldId_EH.lep3,fieldLabelText_EH.lep3);
    insert_checkbox(eh_top,fieldId_EH.dt,fieldLabelText_EH.dt);
    insert_checkbox(eh_top,fieldId_EH.mvt,fieldLabelText_EH.mvt);
    insert_checkbox(eh_top,fieldId_EH.cgo,fieldLabelText_EH.cgo);
    insert_checkbox(eh_top,fieldId_EH.dv,fieldLabelText_EH.dv);
    insert_checkbox(eh_top,fieldId_EH.so,fieldLabelText_EH.so);
    insert_field_label(eh_top,fieldId_EH.total,fieldLabelText_EH.total,"");
    insert_text_field(eh_top,fieldId_EH.total); 
}
function total_points () {
    insert_legend(tsp_top,legend_text.tsp);
    insert_field_label(tsp_top,fieldId_TSP.total,fieldLabelText_TSP.total,"");
    insert_text_field(tsp_top,fieldId_TSP.total); 
}
function sentence_comp () {
    insert_legend(sc_top,legend_text.sc);
    const p1 = document.createElement("p");
    p1.innerText = sc_1_text;
    sc_top.appendChild(p1);
    const p2 = document.createElement("p");
    p2.innerText = sc_2_text;
    sc_top.appendChild(p2);

    insert_field_label(sc_top,fieldId_SC.tsp,fieldLabelText_SC.tsp,"");
    insert_text_field_NB(sc_top,fieldId_SC.tsp);
    insert_field_label(sc_top,fieldId_SC.m28,fieldLabelText_SC.m28,"");
    insert_text_field_NB(sc_top,fieldId_SC.m28);
    insert_field_label(sc_top,fieldId_SC.td75,fieldLabelText_SC.td75,"");
    insert_text_field_NB(sc_top,fieldId_SC.td75);
    
    const td75_postlabel = document.createElement("label");
    td75_postlabel.setAttribute("for",fieldId_SC.td75);
    td75_postlabel.innerText = fieldLabelText_SC.td75post;
    sc_top.appendChild(td75_postlabel);

    const p3 = document.createElement("p");
    p3.innerText = sc_3_text;
    sc_top.appendChild(p3);

    insert_field_label(sc_top,fieldId_SC.mx,fieldLabelText_SC.mx,"");
    insert_text_field(sc_top,fieldId_SC.mx);
}
function sent_imposed () {
    insert_legend(tsi_top,legend_text.tsi);
    
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_sp,fieldLabelText_TSI.check_sp);
    new_nbsp(tsi_top);
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_lf,fieldLabelText_TSI.check_lf);
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.years_r1);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.years_r1,fieldLabelText_TSI.years_r1,"");
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.month_r1);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.month_r1,fieldLabelText_TSI.month_r1,"");
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.days_r1);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.days_r1,fieldLabelText_TSI.days_r1,"br");
    
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_cj,fieldLabelText_TSI.check_cj);
    new_nbsp(tsi_top);
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_ts,fieldLabelText_TSI.check_ts);
     new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.years_r2);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.years_r2,fieldLabelText_TSI.years_r2,"");
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.month_r2);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.month_r2,fieldLabelText_TSI.month_r2,"");
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.days_r2);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.days_r2,fieldLabelText_TSI.days_r2,"br");
    
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_cc,fieldLabelText_TSI.check_cc);
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.years_r3);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.years_r3,fieldLabelText_TSI.years_r3,"");
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.month_r3);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.month_r3,fieldLabelText_TSI.month_r3,"");
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.days_r3);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.days_r3,fieldLabelText_TSI.days_r3,"br");
   

    insert_checkbox_NB(tsi_top,fieldId_TSI.check_pr,fieldLabelText_TSI.check_pr);
    new_nbsp(tsi_top);
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_md,fieldLabelText_TSI.check_md);
     new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.years_r4);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.years_r4,fieldLabelText_TSI.years_r4,"");
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.month_r4);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.month_r4,fieldLabelText_TSI.month_r4,"");
    new_nbsp(tsi_top);
    insert_text_field_NB(tsi_top,fieldId_TSI.days_r4);
    new_nbsp(tsi_top);
    insert_field_label(tsi_top,fieldId_TSI.days_r4,fieldLabelText_TSI.days_r4,"br");
   
    const p1 = document.createTextNode(tsi_1_text);
    tsi_top.appendChild(p1);
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_ho,fieldLabelText_TSI.check_ho);
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_hv,fieldLabelText_TSI.check_hv);
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_vc,fieldLabelText_TSI.check_vc);
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_ro,fieldLabelText_TSI.check_ro);
    insert_checkbox(tsi_top,fieldId_TSI.check_mm,fieldLabelText_TSI.check_mm);
    
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_mi,fieldLabelText_TSI.check_mi);
    insert_checkbox_NB(tsi_top,fieldId_TSI.check_pb,fieldLabelText_TSI.check_pb);
    insert_checkbox(tsi_top,fieldId_TSI.check_pd,fieldLabelText_TSI.check_pd);

    insert_field_label(tsi_top,fieldId_TSI.other,fieldLabelText_TSI.other,"");
    insert_text_field_NB(tsi_top,fieldId_TSI.other);
}
function mitigating () {
    insert_legend(mi_top,legend_text.mi);
    insert_checkbox(mi_top,fieldId_MI.r1,fieldLabelText_MI.r1);
    insert_checkbox(mi_top,fieldId_MI.r2,fieldLabelText_MI.r2);
    insert_checkbox(mi_top,fieldId_MI.r3,fieldLabelText_MI.r3);
    insert_checkbox(mi_top,fieldId_MI.r4,fieldLabelText_MI.r4);
    insert_checkbox(mi_top,fieldId_MI.r5,fieldLabelText_MI.r5);
    insert_checkbox(mi_top,fieldId_MI.r6,fieldLabelText_MI.r6);
    insert_checkbox(mi_top,fieldId_MI.r7,fieldLabelText_MI.r7);
    insert_checkbox(mi_top,fieldId_MI.r8,fieldLabelText_MI.r8);
    insert_checkbox(mi_top,fieldId_MI.r9,fieldLabelText_MI.r9);
    insert_checkbox(mi_top,fieldId_MI.r10,fieldLabelText_MI.r10);
    insert_checkbox(mi_top,fieldId_MI.r11,fieldLabelText_MI.r11);
    insert_checkbox(mi_top,fieldId_MI.r12,fieldLabelText_MI.r12);
    insert_checkbox(mi_top,fieldId_MI.r13,fieldLabelText_MI.r13);
    insert_checkbox(mi_top,fieldId_MI.r14,fieldLabelText_MI.r14);

    const par = document.createElement("p");
    par.innerText = mi_text;
    mi_top.appendChild(par);
}

// call the fieldset builders
preamble();        // Build preamble fields
primary_off();     // Build primary offense fields
additional_off();  // Build basic additional offense fields
victim_injury();   // Build victim injury fields
prior_record();    // Build prior record fields
legal_status();    // Build legal status fields
cs_violation();    // Build com. sanc. violation fields
firearm();         // Build firearm fields
prior_cs_felony(); // Build prior serious & capital fel. fields
subtotal_points(); // Build Subtotal Sentence Points fields
enhancements();    // Build enhancements fields
total_points();    // Build total Sentence Points fields
sentence_comp();   // Build sentence computation fields
sent_imposed();    // Build total sentence imposed fields
mitigating();      // Build mitigating circum. fields
