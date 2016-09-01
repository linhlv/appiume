using System.Threading.Tasks;
using Appiume.Apm.Application.Services;
using Appiume.Web.Modules.EventCloud.Application.Users.Dto;

namespace Appiume.Web.Modules.EventCloud.Application.Users
{
    public interface IUserAppService : IApplicationService
    {
        Task ProhibitPermission(ProhibitPermissionInput input);

        Task RemoveFromRole(long userId, string roleName);
    }
}