import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: 'Case Study' };
  return { title: `${study.title} — Case Study` };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 tablet:px-8">
      <p className="mb-2 font-body text-sm text-zinc-500">Case Study</p>
      <h1 className="mb-4 font-display text-3xl font-semibold text-zinc-950">{study.title}</h1>
      {study.tags.length > 0 && (
        <p className="mb-8 font-body text-sm text-zinc-500">{study.tags.join(' · ')}</p>
      )}

      <div className="mb-8 flex aspect-video items-center justify-center rounded border border-dashed border-zinc-300 bg-zinc-100">
        <span className="font-body text-sm text-zinc-500">Detail layout from Paper</span>
      </div>

      <section className="prose prose-zinc max-w-none space-y-6 font-body text-zinc-700">
        <div>
          <h2 className="font-display text-lg font-semibold text-zinc-950">Overview</h2>
          <p>Role, timeline, tools — paste from Paper design.</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-zinc-950">Problem → Process → Outcome</h2>
          <p>Case study narrative sections — implement from Paper frame.</p>
        </div>
      </section>

      <nav className="mt-12 border-t border-zinc-200 pt-8">
        <Link href="/#case-studies" className="font-body text-sm text-brand hover:underline">
          ← Back to all case studies
        </Link>
      </nav>
    </article>
  );
}
