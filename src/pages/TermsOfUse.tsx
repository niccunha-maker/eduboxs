import { usePageMeta } from "@/hooks/usePageMeta";

const TermsOfUse = () => {
  usePageMeta({ title: "Termos de Uso" });
  return (
    <div className="notebook-lines" style={{ background: "hsl(var(--muted))" }}>
      <div className="container py-16 max-w-3xl">
        <div className="animate-fade-in mb-10">
          <span className="font-handwritten text-2xl text-accent font-bold block mb-2 transform -rotate-1">
            Leitura importante
          </span>
          <h1 className="text-3xl font-bold mb-2">Termos de Uso</h1>
          <p className="text-sm text-muted-foreground">
            Ultima atualizacao: 05 de marco de 2026
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 animate-fade-in stagger-1">
          <p className="text-muted-foreground leading-relaxed">
            Bem-vindo ao site da EduBoxs. Ao acessar ou utilizar este site, voce concorda com os presentes Termos de Uso. Caso nao concorde com qualquer condicao aqui estabelecida, recomendamos que nao utilize a plataforma.
          </p>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">1. Sobre a EduBoxs</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A EduBoxs e uma plataforma digital dedicada a comercializacao de kits de materiais escolares personalizados, montados com base nas listas de materiais fornecidas pelas instituicoes de ensino. O objetivo da EduBoxs e facilitar o processo de compra de materiais escolares para pais e responsaveis, oferecendo praticidade, organizacao e conveniencia, com possibilidade de entrega diretamente na escola do aluno.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">2. Aceitacao dos Termos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Ao acessar ou utilizar o site da EduBoxs, o usuario declara que:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>possui capacidade legal para realizar compras online;</li>
              <li>leu, compreendeu e concorda com estes Termos de Uso;</li>
              <li>concorda tambem com a Politica de Privacidade da plataforma.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              A EduBoxs podera atualizar estes termos periodicamente, sendo responsabilidade do usuario verificar eventuais alteracoes.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">3. Cadastro e Informacoes do Usuario</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Para realizar compras no site, o usuario podera fornecer informacoes como:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>nome completo;</li>
              <li>e-mail;</li>
              <li>telefone;</li>
              <li>nome do aluno;</li>
              <li>escola;</li>
              <li>serie ou ano escolar.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              O usuario se compromete a fornecer informacoes verdadeiras, completas e atualizadas. A EduBoxs nao se responsabiliza por eventuais problemas decorrentes de informacoes incorretas ou incompletas fornecidas pelo usuario.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">4. Produtos e Kits Escolares</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Os kits comercializados pela EduBoxs sao montados com base nas listas de materiais fornecidas pelas escolas. Em determinadas situacoes, alguns itens poderao ser substituidos por produtos equivalentes, mantendo a mesma finalidade e padrao de qualidade, caso haja indisponibilidade de estoque. A EduBoxs se compromete a garantir a equivalencia funcional dos itens incluidos nos kits.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">5. Precos e Pagamentos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Os precos dos kits escolares sao informados no site no momento da compra. Os pagamentos poderao ser realizados por meio das opcoes disponibilizadas na plataforma, que podem incluir:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>cartao de credito;</li>
              <li>pix;</li>
              <li>outros meios eletronicos de pagamento.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              A confirmacao do pedido ocorrera somente apos a aprovacao do pagamento pela plataforma de pagamento utilizada.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">6. Entrega dos Kits</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Os kits adquiridos poderao ser entregues de acordo com o modelo informado no momento da compra, podendo incluir:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>entrega diretamente na escola do aluno;</li>
              <li>retirada em ponto de distribuicao previamente informado.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Os prazos de entrega podem variar de acordo com a escola selecionada, a serie do aluno, o periodo do calendario escolar e a disponibilidade de estoque. A EduBoxs se compromete a comunicar previamente aos usuarios os prazos estimados de entrega.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">7. Cancelamentos e Direito de Arrependimento</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nos termos do Codigo de Defesa do Consumidor (Lei n. 8.078/1990), o consumidor podera exercer o direito de arrependimento em ate 7 (sete) dias corridos apos a confirmacao da compra, desde que o pedido ainda nao tenha sido entregue. Apos a entrega dos kits, eventuais solicitacoes de troca ou devolucao poderao ser avaliadas individualmente pela EduBoxs.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">8. Propriedade Intelectual</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Todo o conteudo presente no site da EduBoxs, incluindo, mas nao se limitando a logotipo, marca, identidade visual, textos, imagens e layout do site, e protegido por direitos de propriedade intelectual. E proibida a reproducao, distribuicao ou utilizacao desse conteudo sem autorizacao previa da EduBoxs.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">9. Limitacao de Responsabilidade</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              A EduBoxs nao se responsabiliza por:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>falhas temporarias de acesso ao site;</li>
              <li>problemas decorrentes de conexao de internet do usuario;</li>
              <li>informacoes incorretas fornecidas pelo usuario no momento do cadastro ou compra.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              A empresa compromete-se a empregar seus melhores esforcos para manter o funcionamento adequado da plataforma.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">10. Modificacoes nos Servicos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A EduBoxs podera modificar, suspender ou descontinuar funcionalidades do site a qualquer momento, visando melhorias operacionais ou ajustes nos servicos prestados.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">11. Legislacao Aplicavel</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Estes Termos de Uso sao regidos pelas leis da Republica Federativa do Brasil. Em caso de conflitos, sera aplicado o foro do domicilio do consumidor, conforme previsto no Codigo de Defesa do Consumidor.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
