import { CaseDetailView } from "@/components/case-detail-view"

export default function CaseDetail({ params }: { params: { id: string } }) {
  return <CaseDetailView caseId={params.id} />
}
