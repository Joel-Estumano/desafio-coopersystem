import { FormBuilder, FormGroup } from "@angular/forms";

const fb = new FormBuilder()

export class Investimento {

    public acoes: any[] = [];
    public indicadorCarencia: string | null = null;
    public nome: string | null = null;
    public objetivo: string | null = null;
    public saldoTotal: number = 0;
    public totalDoResgate: number | null = null;

    fromObject(json: any) {
        Object.assign(this, json);
    }

    toObject() {
        let json: any = new Object();
        Object.assign(json, this);
        return json;
    }

    public getValuesForm(form: FormGroup) {
        const value = form.value;
        this.acoes = value.acoes;
        this.indicadorCarencia = value.indicadorCarencia;
        this.nome = value.nome;
        this.objetivo = value.objetivo;
        this.saldoTotal = value.saldoTotal;
    }

    public createForm() {
        return {
            acoes: fb.array([]),
            indicadorCarencia: [this.indicadorCarencia],
            nome: [this.nome],
            objetivo: [this.objetivo],
            saldoTotal: [this.saldoTotal],
            totalDoResgate: [this.totalDoResgate]
        }
    }
}